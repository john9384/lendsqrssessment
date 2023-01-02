import { Express } from 'express'

declare module 'express-serve-static-core' {
	interface Auth {
		id: string
		email?: string
		vendorId?: string
	}
	export interface Request {
		auth: Auth
	}
}
