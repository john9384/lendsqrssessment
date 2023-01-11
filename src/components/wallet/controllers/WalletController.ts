import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers'
import { paystackService, walletService } from '../services'
import IWalletController from '../../../types/wallet/IWalletController'

class WalletController implements IWalletController {
	public async deposit(req: Request, res: Response) {
		const { amount } = req.body
		const userId = req.auth.id
		const responseData = await walletService.deposit({ userId, amount })

		return new SuccessResponse('Deposite Initiated', responseData).send(res)
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

	public async completeTransaction(req: Request, res: Response) {
		const referenceId = req.query.reference
		const responseData = await walletService.completeTransaction(
			referenceId as string,
		)

		return new SuccessResponse('Transaction complete', responseData).send(res)
	}

	public async getBankList(req: Request, res: Response) {
		const responseData = await paystackService.getListOfBanks()

		return new SuccessResponse('Transaction complete', responseData).send(res)
	}
}

export default new WalletController()
