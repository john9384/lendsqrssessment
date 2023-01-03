import { BaseModel } from '../../../db/model/BaseModel'

interface User {
	id: number
	firstname: string
	lastname: string
	email: string
	password: string
}

class UserModel extends BaseModel<User> {}

export const User = new UserModel('users')
