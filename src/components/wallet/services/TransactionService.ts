import Transaction from '../models/Transaction'
import { ITransactionService } from '../../../types/wallet'

class TransactionService implements ITransactionService {
	public async createTransaction({
		userId,
		walletId,
		amount,
		type,
		status,
		referenceId,
	}: any) {
		await Transaction.create({
			userId,
			walletId,
			amount,
			type,
			status,
			referenceId,
		})

		return { referenceId }
	}

	public async updateTransaction(query: any, payload: any) {
		const updatedTransaction = await Transaction.update(query, payload)

		return {
			referenceId: updatedTransaction.referenceId,
		}
	}
}

export default new TransactionService()
