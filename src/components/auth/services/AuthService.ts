import { bcryptCompare, jwtEncode } from '../../../library/helpers'
import { BadRequestError } from '../../../library/helpers/error'
import { IAuthService, LoginForm, SignupForm } from '../../../types/auth'
import { userService } from '../../user/services'

class AuthService implements IAuthService {
	public async signup(formData: SignupForm) {
		const existingUser = await userService.getUser({ email: formData.email })

		if (existingUser) throw new BadRequestError('User already registered')

		const newUser = await userService.createUser(formData)

		return { email: newUser.email }
	}

	public async login(formData: LoginForm) {
		const { email, password } = formData
		const existingUser = await userService.getUser({ email })

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
