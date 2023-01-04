import { userService } from '../../user/services'
import { Wallet } from '../models'
import { BadRequestError } from '../../../library/helpers/error'
import { paystackService } from '.'
import Transaction from '../models/Transaction'
import UserService from '../../user/services/UserService'

class WalletService {
	public async createWallet(userId: number) {
		await Wallet.create({
			userId,
			balance: 0,
		})

		return { msg: 'Wallet created' }
	}

	public async deposit(payload: any) {
		const { userId, amount } = payload
		const wallet = await this.getWallet({ userId })

		const paystackData = await paystackService.initalizePayment({
			amount: Number(amount),
			email: 'ogungburedamilola@gmail.com',
		})

		await Transaction.create({
			userId,
			walletId: wallet?.id,
			amount: Number(amount),
			type: 'CREDIT',
			referenceId: paystackData.reference,
		})

		return {
			authorization_url: paystackData.authorization_url,
		}
	}

	public async completeTransaction(referenceId: any) {
		const transaction = await Transaction.read({ referenceId })
		console.log(transaction)

		if (
			!transaction ||
			transaction.status == 'SUCCESS' ||
			transaction.status == 'FAILED'
		) {
			throw new BadRequestError('Invalid transaction')
		}

		const transactionType = transaction.type
		const wallet = await Wallet.read({ userId: transaction.userId })

		switch (transactionType) {
			case 'CREDIT':
				const crediteddWallet = await this.addToBalance(
					transaction.userId,
					Number(wallet?.balance),
					transaction.amount,
				)

				await Transaction.update({ id: transaction.id }, { status: 'SUCCESS' })
				return { balance: crediteddWallet?.balance }

			case 'DEBIT':
				const debitedWallet = await this.deductFromBalance(
					transaction.userId,
					Number(wallet?.balance),
					transaction.amount,
				)

				await Transaction.update({ id: transaction.id }, { status: 'SUCCESS' })
				return { balance: debitedWallet?.balance }

			default:
				await Transaction.update({ id: transaction.id }, { status: 'FAILED' })
				return {}
		}
	}

	public async withdraw(payload: any) {
		const { userId, amount } = payload
		// const user = await UserService.getUser({ id: userId })
		const wallet = await this.getWallet({ userId })
		const currentBalance = Number(wallet?.balance)

		if (currentBalance < Number(amount))
			throw new BadRequestError("You don't have enough balance")

		console.log('gets here')
		const transferRecipient = await paystackService.createTransferRecipient({
			name: 'John Ogungbure',
			account_number: '0220401275',
			// account_number: 0220401275,
			bank_code: 58,
			currency: 'NGN',
		})

		const paystackData = await paystackService.initiateTransfer({
			amount: Number(amount),
			recipient: transferRecipient.id,
			reason: 'A test',
		})

		await Transaction.create({
			userId,
			walletId: wallet?.id,
			amount: Number(amount),
			type: 'DEBIT',
			referenceId: paystackData.reference,
		})

		return {
			authorization_url: paystackData.authorization_url,
		}
	}

	public async transfer(payload: any) {
		const { userId, amount, recieverEmail } = payload
		const wallet = await this.getWallet({ userId })
		const currentBalance = Number(wallet?.balance)

		if (currentBalance < Number(amount))
			throw new BadRequestError("You don't have enough balance")

		const reciever = await this.checkExistingUser({ email: recieverEmail })
		if (!reciever) throw new BadRequestError('User with email does not exist')

		const recieverWallet = await this.getWallet({ userId: reciever.id })
		if (!recieverWallet)
			throw new BadRequestError('There is a problem with reciever acccount')

		// widthdraw from current user
		const updatedWallet = await this.deductFromBalance(
			userId,
			currentBalance,
			amount,
		)

		// deposit to recievers wallet
		await this.addToBalance(reciever.id, recieverWallet.balance, amount)

		return {
			balance: updatedWallet?.balance,
		}
	}

	public async getWallet(query: any) {
		const wallet = await Wallet.read(query)
		return wallet
	}

	private async checkExistingUser(query: any) {
		const user = await userService.getUser(query)
		return user
	}

	private async addToBalance(
		userId: number,
		currentBalance: number,
		amount: number,
	) {
		const newBalance = currentBalance + amount
		const updatedWallet = await Wallet.update(
			{ userId },
			{ balance: newBalance },
		)

		return updatedWallet
	}

	private async deductFromBalance(
		userId: number,
		currentBalance: number,
		amount: number,
	) {
		const newBalance = currentBalance - amount
		const updatedWallet = await Wallet.update(
			{ userId },
			{ balance: newBalance },
		)

		return updatedWallet
	}
}

export default new WalletService()
