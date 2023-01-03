// import { Express } from 'express'

// declare module 'express-serve-static-core' {
// 	interface Auth {
// 		id: string
// 		email?: string
// 	}
// 	export interface Request {
// 		auth: Auth
// 	}
// }

declare namespace Express {
	export interface Request {
		auth: any
	}
}
