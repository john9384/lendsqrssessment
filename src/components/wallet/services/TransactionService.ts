import Transaction from '../models/Transaction'

class TransactionService {
	public async create({ userId, walletId, type, status }: any) {
		await Transaction.create({ userId, walletId, type, status })

		return { status }
	}
	public async update(query: any, payload: any) {
		const updatedTransaction = await Transaction.update(query, payload)

		return {
			...updatedTransaction,
		}
	}
}

export default new TransactionService()
