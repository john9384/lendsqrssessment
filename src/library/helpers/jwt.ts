import jwt from 'jsonwebtoken'
import config from '../../config'

const JWT_SECRET = String(config.jwt.SECRET)

export interface IPayload {
	[key: string]: any
}

export const jwtEncode = (payload: IPayload) =>
	jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

export const jwtDecode = (token: string) => jwt.verify(token, JWT_SECRET)
