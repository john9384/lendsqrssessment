import IUser from './IUser'
import { ICreateUser } from './IUserForm'

interface IUserService {
	createUser(payload: ICreateUser): Promise<{ email: string }>
	getUser(query: Partial<IUser>): Promise<IUser | null>
}

export default IUserService
