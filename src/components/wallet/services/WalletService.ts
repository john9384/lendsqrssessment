import { userService } from '../../user/services'
import { Wallet } from '../models/WalletModel'
import { BadRequestError } from '../../../library/helpers/error'

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
		const currentBalance = Number(wallet?.balance)
		const newBalance = currentBalance + Number(amount)

		const updatedWallet = await Wallet.update(
			{ userId },
			{ balance: newBalance },
		)

		return {
			balance: updatedWallet?.balance,
		}
	}

	public async withdraw(payload: any) {
		const { userId, amount } = payload
		const wallet = await this.getWallet({ userId })
		const currentBalance = Number(wallet?.balance)

		if (currentBalance < Number(amount))
			throw new BadRequestError("You don't have enough balance")

		const newBalance = currentBalance - Number(amount)

		const updatedWallet = await Wallet.update(
			{ userId },
			{ balance: newBalance },
		)

		return {
			balance: updatedWallet?.balance,
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

		// widthdraw from current user
		const updatedWallet = await this.withdraw({ userId, amount })

		// deposit to recievers wallet
		await this.deposit({ userId: reciever.id, amount })

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
}

export default new WalletService()
