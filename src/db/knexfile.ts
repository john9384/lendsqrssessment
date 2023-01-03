import type { Knex } from 'knex'
import config from './config'

const knexConfig: { [key: string]: Knex.Config } = {
	development: {
		client: 'mysql2',
		connection: {
			host: config.DB_HOST,
			port: config.DB_PORT,
			user: config.DB_USER,
			password: config.DB_PASSWORD,
			database: config.DB_NAME,
		},
		migrations: {
			directory: './migrations',
			tableName: 'migrations',
			extension: 'ts',
		},
	},

	production: {
		client: 'mysql2',
		connection: {
			host: config.DB_HOST,
			port: config.DB_PORT,
			user: config.DB_USER,
			password: config.DB_PASSWORD,
			database: config.DB_NAME,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: './migrations',
			tableName: 'migrations',
			extension: 'ts',
		},
	},
}

export default knexConfig
