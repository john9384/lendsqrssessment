import Transaction from '../models/Transaction'

class TransactionService {
	public async create({ userId, walletId, amount, type, referenceId }: any) {
		await Transaction.create({
			userId,
			walletId,
			amount,
			type,
			status: 'PENDING',
			referenceId,
		})

		return { referenceId }
	}
	public async update(query: any, payload: any) {
		const updatedTransaction = await Transaction.update(query, payload)

		return {
			...updatedTransaction,
		}
	}
}

export default new TransactionService()
