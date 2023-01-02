import dotenv from 'dotenv'

const envFound = dotenv.config({ path: '.env' })

if (!envFound) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const config = {
	api: {
		BASE: process.env.API_BASE,
		PREFIX: process.env.API_PREFIX,
	},
	app: {
		NAME: process.env.APP_NAME,
		PORT: Number(process.env.APP_PORT),
		ENV: process.env.NODE_ENV,
	},
	jwt: {
		SECRET: process.env.JWT_SECRET,
		TOKEN_TYPE: process.env.JWT_TOKEN_TYPE,
	},
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
		directory: process.env.LOG_DIRECTORY,
	},
}

export default config
