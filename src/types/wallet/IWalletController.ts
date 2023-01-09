import { Request, Response } from 'express'

interface IAuthController {
	deposit(req: Request, res: Response): Promise<Response<Record<string, any>>>
	withdraw(req: Request, res: Response): Promise<Response<Record<string, any>>>
	transfer(req: Request, res: Response): Promise<Response<Record<string, any>>>
	completeTransaction(
		req: Request,
		res: Response,
	): Promise<Response<Record<string, any>>>
	getBankList(
		req: Request,
		res: Response,
	): Promise<Response<Record<string, any>>>
}

export default IAuthController
