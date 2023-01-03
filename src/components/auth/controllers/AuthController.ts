import { Request, Response } from 'express'
import { SuccessResponse } from '../../../library/helpers'
import { authService } from '../services'

class AuthController {
	public async signup(req: Request, res: Response) {
		const formData = req.body
		const responseData = await authService.signup(formData)

		return new SuccessResponse('User Signed up', responseData).send(res)
	}

	public async login(req: Request, res: Response) {
		const formData = req.body
		const responseData = await authService.login(formData)

		return new SuccessResponse('User Logged in', responseData).send(res)
	}
}

export default new AuthController()
