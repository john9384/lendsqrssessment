import { User } from '../models/UserModel'
import { bcryptEncode } from '../../../library/helpers'
import { walletService } from '../../wallet/services'
import { IUser, IUserService, ICreateUser } from '../../../types/user'

class UserService implements IUserService {
	public async createUser(payload: ICreateUser) {
		const { firstname, lastname, email, password } = payload
		const encryptedPassword = bcryptEncode(password)

		await User.create({
			firstname,
			lastname,
			email,
			password: encryptedPassword,
		})

		const createdUser = await User.read({ email })

		createdUser && (await walletService.createWallet(createdUser.id))

		return { email }
	}

	public async getUser(query: Partial<IUser>) {
		const user = await User.read(query)
		return user
	}
}

export default new UserService()
