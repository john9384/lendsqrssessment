import express from 'express'
import config from '../config'
import { authRouter } from '../components/auth/routes'
import { walletRouter } from '../components/wallet/routes'

const router = express.Router()

const { PREFIX } = config.api

router.use(`/${PREFIX}/auth`, authRouter)
router.use(`/${PREFIX}/wallet`, walletRouter)

export default router
