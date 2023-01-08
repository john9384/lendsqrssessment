import express, { Request, Response } from 'express'
import config from '../config'
import { authRouter } from '../components/auth/routes'
import { walletRouter } from '../components/wallet/routes'

const router = express.Router()

const { PREFIX } = config.api

router.get('/', (req: Request, res: Response) => {
	return res
		.status(200)
		.send({ msg: `${config.app.NAME} is running on port ${config.app.PORT}` })
})

router.use(`/${PREFIX}/auth`, authRouter)
router.use(`/${PREFIX}/wallet`, walletRouter)

export default router
