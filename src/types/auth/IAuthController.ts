import { Request, Response } from 'express'

interface IAuthController {
	signup(req: Request, res: Response): Promise<Response<Record<string, any>>>
	login(req: Request, res: Response): Promise<Response<Record<string, any>>>
}

export default IAuthController
