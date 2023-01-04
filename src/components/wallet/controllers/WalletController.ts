import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers'
import { paystackService, walletService } from '../services'

class WalletController {
	public async deposit(req: Request, res: Response) {
		const { amount } = req.body
		const userId = req.auth.id
		const responseData = await walletService.deposit({ userId, amount })
		console.log(responseData)

		res.statusCode = 302
		res.setHeader('Location', responseData.authorization_url)
		return res.end()
	}

	public async completeTransaction(req: Request, res: Response) {
		const referenceId = req.query.reference
		const responseData = await walletService.completeTransaction(referenceId)

		return new SuccessResponse('Transaction complete', responseData).send(res)
	}

	public async getBankList(req: Request, res: Response) {
		const responseData = await paystackService.getListOfBanks()

		return new SuccessResponse('Transaction complete', responseData).send(res)
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
