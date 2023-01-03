import Joi from 'joi'

const firstname = Joi.string().required().label('Firstname').messages({
	'string.empty': `Firstname is required`,
	'any.required': `Firstname is required`,
})

const lastname = Joi.string().required().label('Lastname').messages({
	'string.empty': `Lastname is required`,
	'any.required': `Lastname is required`,
})

const email = Joi.string()
	.email({ minDomainSegments: 2 })
	.required()
	.label('email')
	.messages({
		'any.required': 'Email is required',
		'string.empty': 'Email is required',
		'string.email': 'Email is invalid',
	})

const password = Joi.string()
	.min(8)
	.label('password')
	.regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
	.required()
	.messages({
		'any.required': 'Password is required',
		'string.min': '"Password" must have at least 8 characters',
		'string.required': '"Password" is required',
		'object.regex': '"Password" must have at least 8 characters',
		'string.pattern.base':
			'Password must have a minimum (8) eight characters, at least one uppercase letter, one number and one special character is required',
	})

const confirmPassword = Joi.any()
	.valid(Joi.ref('password'))
	.required()
	.messages({
		'any.only': 'Password and Confirm Password must match',
		'any.required': 'Confirm Password is required',
		'any.valid': 'Password mismatch',
	})

const loginPassword = Joi.string().label('password').required().messages({
	'any.required': 'Password is required',
	'string.required': '"Password" is required',
})

const token = Joi.string().min(6).max(6).label('token').required()

export default {
	signup: Joi.object().keys({
		firstname,
		lastname,
		email,
		password,
		confirmPassword,
	}),
	login: Joi.object().keys({
		email,
		password: loginPassword,
	}),
}
