import knex from 'knex'
import { Logger } from '../library/helpers'
import config from './config'

const db = knex({
	client: 'mysql2',
	connection: {
		host: config.DB_HOST,
		port: config.DB_PORT,
		user: config.DB_USER,
		password: config.DB_PASSWORD,
		database: config.DB_NAME,
	},
	log: {
		warn(message: string) {
			Logger.warn('== DB warning == ' + message)
		},
		error(message: string) {
			Logger.error('== DB warning == ' + message)
		},
		debug(message: string) {
			Logger.info('== DB warning == ' + message)
		},
	},
})

const ConnectDatabase = async () => {
	db.raw('SELECT 1')
		.then(() => {
			Logger.info('Database connected')
		})
		.catch(e => {
			Logger.error('Database not connected')
			Logger.error(e)
		})
}

export default ConnectDatabase
