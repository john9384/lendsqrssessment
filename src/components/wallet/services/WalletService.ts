import * as uuid from 'uuid'
import { Wallet } from '../models'
import { Transaction } from '../models'
import { IUser } from '../../../types/user'
import { userService } from '../../user/services'
import { paystackService, transactionService } from '.'
import {
	IWallet,
	IWalletService,
	TransactionBasePayload,
	Transfer,
} from '../../../types/wallet'
import { BadRequestError } from '../../../library/helpers/error'

class WalletService implements IWalletService {
	public async createWallet(userId: number) {
		const newWallet = await Wallet.create({
			userId,
			balance: 0,
		})

		return newWallet
	}

	public async getWallet(query: Partial<IWallet>) {
		const wallet = await Wallet.read(query)
		return wallet
	}

	public async deposit(payload: TransactionBasePayload) {
		const { userId, amount } = payload
		const wallet = (await this.getWallet({ userId })) as IWallet

		const paystackData = await paystackService.initalizePayment({
			amount: Number(amount),
			email: 'ogungburedamilola@gmail.com',
		})

		await transactionService.createTransaction({
			userId,
			walletId: wallet?.id,
			amount: Number(amount),
			type: 'CREDIT',
			status: 'SUCCESS',
			referenceId: paystackData.reference,
		})

		return {
			paymentAuthUrl: paystackData.authorization_url,
		}
	}

	public async withdraw(payload: TransactionBasePayload) {
		const { userId, amount } = payload
		const wallet = await this.getWallet({ userId })

		if (!wallet)
			throw new BadRequestError(
				'There is no wallet associated with this account',
			)

		if (wallet.balance < Number(amount))
			throw new BadRequestError("You don't have enough balance")

		const updatedBalance = Number(wallet.balance) - Number(amount)
		const updatedWallet = await this.updateWallet(
			{ userId },
			{ balance: updatedBalance },
		)

		// register transaction
		await transactionService.createTransaction({
			userId: userId,
			walletId: wallet.id,
			amount: Number(amount),
			type: 'DEBIT',
			status: 'SUCCESS',
			referenceId: uuid.v4(),
		})

		return {
			balance: updatedWallet.balance,
		}
	}

	public async transfer(payload: Transfer) {
		const { userId, amount, recieverEmail } = payload
		const wallet = (await this.getWallet({ userId })) as IWallet

		const currentBalance = Number(wallet.balance)

		if (currentBalance < Number(amount))
			throw new BadRequestError("You don't have enough balance")

		const reciever = await this.checkExistingUser({ email: recieverEmail })
		if (!reciever) throw new BadRequestError('User with email does not exist')

		const recieverWallet = await this.getWallet({ userId: reciever.id })
		if (!recieverWallet)
			throw new BadRequestError('There is a problem with reciever acccount')

		// debit current user
		const debitedBalance = Number(wallet.balance) - Number(amount)
		const updatedWallet = await this.updateWallet(
			{ userId },
			{ balance: debitedBalance },
		)

		// register trannsaction
		await transactionService.createTransaction({
			userId,
			recipientId: reciever.id,
			walletId: wallet?.id,
			amount: Number(amount),
			type: 'DEBIT',
			status: 'SUCCESS',
			referenceId: uuid.v4(),
		})

		// credit recievers wallet
		const recieverCreditedBalance =
			Number(recieverWallet.balance) + Number(amount)

		await this.updateWallet(
			{ userId: reciever.id },
			{ balance: recieverCreditedBalance },
		)

		// register transaction
		await transactionService.createTransaction({
			userId: reciever.id,
			recipientId: userId,
			walletId: recieverWallet.id,
			amount: Number(amount),
			type: 'CREDIT',
			status: 'SUCCESS',
			referenceId: uuid.v4(),
		})

		return {
			balance: updatedWallet.balance,
		}
	}

	// Service to handle the hook from payment method
	public async completeTransaction(referenceId: string) {
		const transaction = await Transaction.read({ referenceId })

		if (
			!transaction ||
			transaction.status == 'SUCCESS' ||
			transaction.status == 'FAILED'
		) {
			throw new BadRequestError('Invalid transaction')
		}

		const transactionType = transaction.type
		const wallet = (await Wallet.read({
			userId: transaction.userId,
		})) as IWallet

		switch (transactionType) {
			case 'CREDIT':
				const creditedBalance =
					Number(wallet.balance) + Number(transaction.amount)

				const crediteddWallet = await this.updateWallet(
					{ userId: transaction.userId },
					{ balance: creditedBalance },
				)

				await transactionService.updateTransaction(
					{ id: transaction.id },
					{ status: 'SUCCESS' },
				)
				return { balance: crediteddWallet.balance }

			case 'DEBIT':
				const debitedBalance =
					Number(wallet.balance) - Number(transaction.amount)

				const debitedWallet = await this.updateWallet(
					{ userId: transaction.userId },
					{ balance: debitedBalance },
				)

				await transactionService.updateTransaction(
					{ id: transaction.id },
					{ status: 'SUCCESS' },
				)
				return { balance: debitedWallet.balance }

			default:
				await transactionService.updateTransaction(
					{ id: transaction.id },
					{ status: 'FAILED' },
				)
				return { balance: wallet.balance }
		}
	}

	private async updateWallet(
		query: Partial<IWallet>,
		data: Partial<IWallet>,
	): Promise<IWallet> {
		const updatedWallet = await Wallet.update(query, data)

		return updatedWallet
	}

	private async checkExistingUser(query: Partial<IUser>) {
		const user = await userService.getUser(query)
		return user
	}
}

export default new WalletService()
