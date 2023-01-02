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
	DB_TYPE: process.env.DB_TYPE,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
}

export default config
