import express, { Request, Response } from 'express'

const authRouter = express.Router()

authRouter.get('/', (req: Request, res: Response) =>
	res.send('Auth Router connected'),
)

export { authRouter }
