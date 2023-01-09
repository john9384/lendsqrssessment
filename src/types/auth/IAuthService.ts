import { LoginForm, SignupForm } from './IAuthForm'

interface IAuthService {
	signup(payload: SignupForm): Promise<{ email: string }>
	login(payload: LoginForm): Promise<{ email: string; token: string }>
}

export default IAuthService
