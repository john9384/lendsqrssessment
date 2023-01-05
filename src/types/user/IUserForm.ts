import IUser from './IUser'

export type ICreateUser = Pick<
	IUser,
	'firstname' | 'lastname' | 'email' | 'password'
>
