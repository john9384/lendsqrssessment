import { User } from '../models/UserModel'
import { bcryptEncode } from '../../../library/helpers'
import { walletService } from '../../wallet/services'

class UserService {
	public async createUser(payload: any) {
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

	public async getUser(query: any) {
		const user = await User.read(query)
		return user
	}
}

export default new UserService()
