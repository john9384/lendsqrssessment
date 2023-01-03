import express, { Request, Response } from 'express'
import { catchErrors } from '../../../library/helpers'
import { walletController } from '../controllers'
import { isAuthenticated, validator } from '../../../library/middlewares'

const walletRouter = express.Router()

walletRouter.get('/', (req: Request, res: Response) =>
	res.send({ msg: 'Auth routes connected' }),
)

walletRouter.post(
	'/deposit',
	isAuthenticated,
	catchErrors(walletController.deposit),
)

walletRouter.post(
	'/withdraw',
	isAuthenticated,
	catchErrors(walletController.withdraw),
)

walletRouter.post(
	'/transfer',
	isAuthenticated,
	catchErrors(walletController.transfer),
)

export { walletRouter }
