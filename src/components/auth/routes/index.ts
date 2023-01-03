import express, { Request, Response } from 'express'
import { catchErrors } from '../../../library/helpers'
import { authController } from '../controllers'
import { validator } from '../../../library/middlewares'
import schema from './schemas'

const authRouter = express.Router()

authRouter.get('/', (req: Request, res: Response) =>
	res.send({ msg: 'Auth routes connected' }),
)

authRouter.post(
	'/signup',
	validator(schema.signup),
	catchErrors(authController.signup),
)

authRouter.post(
	'/login',
	validator(schema.login),
	catchErrors(authController.login),
)

export { authRouter }
