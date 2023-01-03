import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers'
import { walletService } from '../services'

class WalletController {
	public async deposit(req: Request, res: Response) {
		const { amount } = req.body
		const userId = req.auth.id
		const responseData = await walletService.deposit({ userId, amount })

		return new SuccessResponse('Deposited', responseData).send(res)
	}

	public async withdraw(req: Request, res: Response) {
		const userId = req.auth.id
		const { amount } = req.body
		const responseData = await walletService.withdraw({ userId, amount })

		return new SuccessResponse('Withdrawn', responseData).send(res)
	}

	public async transfer(req: Request, res: Response) {
		const userId = req.auth.id
		const { amount, recieverEmail } = req.body
		const responseData = await walletService.transfer({
			userId,
			amount,
			recieverEmail,
		})

		return new SuccessResponse('Transfered', responseData).send(res)
	}
}

export default new WalletController()
