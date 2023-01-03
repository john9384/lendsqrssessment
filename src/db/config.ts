import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import { Logger } from '../library/helpers'

if (process.env.ENVIRONMENT === 'development' && !fs.existsSync('.env')) {
	Logger.error('.env file not found')
}

dotenv.config({
	path: path.join(__dirname, '../../.env'),
})

const config = {
	DB_HOST: process.env.DB_HOST,
	DB_PORT: Number(process.env.DB_PORT),
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
}

export default config
