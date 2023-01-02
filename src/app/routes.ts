import express from 'express'
import config from '../config'
import { authRouter } from '../components/auth/routes'

const router = express.Router()

const { PREFIX } = config.api

router.use(`/${PREFIX}/auth`, authRouter)

export default router
