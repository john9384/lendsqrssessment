import { Request, Response, NextFunction } from 'express'
import { jwtDecode } from '../helpers/jwt'
import {
	AccessTokenError,
	AuthFailureError,
	TokenExpiredError,
} from '../helpers/error'
import { Logger } from '../helpers'
import { userService } from '../../components/user/services'

const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.header('Authorization')) {
			throw new TokenExpiredError('Token has Expired')
		}

		const token: string = req?.header('Authorization')?.split(' ')[1] || ''
		const decoded: any = jwtDecode(token)
		const user = await userService.getUser({ id: decoded.userId })

		if (!user) {
			Logger.error('User not registered or Invalid access token')
			throw new AuthFailureError('User not registered or Invalid access token')
		}

		req.auth = {
			id: String(user.id),
			email: decoded.email,
		}

		return next()
	} catch (error: any) {
		if (error instanceof TokenExpiredError) {
			next(new AccessTokenError(error.message))
		}
		next(error)
	}
}

export { isAuthenticated }
