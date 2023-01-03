import { User } from '../../user/models/UserModel'
import {
	bcryptEncode,
	bcryptCompare,
	jwtEncode,
} from '../../../library/helpers'
import { BadRequestError } from '../../../library/helpers/error'

class AuthService {
	public async signup(formData: any) {
		console.log('Should not get here')
		const { firstname, lastname, email, password } = formData
		const existingUser = await User.read({ email })

		if (existingUser) throw new BadRequestError('User already registered')

		const encryptedPassword = bcryptEncode(password)

		await User.create({
			firstname,
			lastname,
			email,
			password: encryptedPassword,
		})

		return { email: formData.email }
	}

	public async login(formData: any) {
		const { email, password } = formData
		const existingUser = await User.read({ email })

		if (!existingUser) throw new BadRequestError('Invalid Credentials')

		const passwordValid = bcryptCompare(password, existingUser.password)
		if (!passwordValid) {
			throw new BadRequestError(
				'Invalid Credential, Check the email or password',
			)
		}

		const encodedData = jwtEncode({ userId: existingUser.id })

		return {
			email: existingUser.email,
			token: encodedData,
		}
	}
}

export default new AuthService()
