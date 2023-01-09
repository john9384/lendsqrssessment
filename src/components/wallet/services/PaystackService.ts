import axios from 'axios'
import _ from 'lodash'
import config from '../../../config'
import { Logger } from '../../../library/helpers'

const baseURL = config.paystack.baseUrl
console.log(baseURL)

export interface IcreateTransferRecipient {
	// name: string
	// account_number: string
	// bank_code: string
	// currency: string
	[key: string]: any
}
export interface IinitiateTransfer {
	// amount: number
	// recipient: string
	// reason: string
	[key: string]: any
}

class PaystackService {
	static async getListOfBanks() {
		try {
			const response = await axios.get(
				`${baseURL}/bank?currency=NGN`,

				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)
			const bankList = _.map(response.data.data, x =>
				_.assign({
					name: x.name,
					code: x.code,
				}),
			)
			return bankList
		} catch (error) {
			throw error
		}
	}

	static async verifyBankAccount(input: {
		accountNumber: string
		bankCode: string
	}) {
		try {
			console.log('credentials', {
				accountNumber: input.accountNumber,
				bankCode: input.bankCode,
			})
			const response = await axios.get(
				`${baseURL}/bank/resolve?account_number=${input.accountNumber}&bank_code=${input.bankCode}`,
				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)
			console.log('paystack secreet', config.paystack.secret)
			return response.data.data
		} catch (error) {
			console.log('verify account instance', error)
			throw error
		}
	}

	static async verifyPayment(input: { reference: string }): Promise<any> {
		try {
			const response = await axios.get(
				`${baseURL}/transaction/verify/${input.reference}`,
				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)
			console.log(response)
			return response.data.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async initalizePayment(input: { amount: number; email: string }) {
		try {
			const response = await axios.post(
				`${baseURL}/transaction/initialize`,
				{
					amount: input.amount * 100,
					email: input.email,
					callback: (cal: any) => {
						Logger.info(`payment successful i dont know what else to do ${cal}`)
					},
				},
				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)

			return response.data.data
		} catch (error: any) {
			console.log(error)
			throw new Error(error.message)
		}
	}

	static async createTransferRecipient(input: IcreateTransferRecipient) {
		try {
			const response = await axios.post(
				`${baseURL}/transferrecipient`,
				{
					name: input.name,
					type: 'nuban',
					account_number: input.account_number,
					bank_code: input.bank_code,
					currency: input.currency,
				},
				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)
			return response.data.data
		} catch (error: any) {
			console.log(error.response.data)
			throw new Error(error.message)
		}
	}

	static async initiateTransfer(input: IinitiateTransfer) {
		try {
			const response = await axios.post(
				`${baseURL}/transfer`,
				{
					source: 'balance',
					amount: input.amount * 100,
					recipient: input.recipient,
					reason: input.reason,
				},
				{
					headers: {
						Authorization: `Bearer ${config.paystack.secret}`,
					},
				},
			)

			return response.data
		} catch (error) {
			throw error
		}
	}
}

export default PaystackService
