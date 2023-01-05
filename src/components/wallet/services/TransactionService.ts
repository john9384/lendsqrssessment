import { Transaction } from '../models'
import {
	ITransaction,
	ITransactionService,
	ICreateTransaction,
	IUpdateTransaction,
} from '../../../types/wallet'

class TransactionService implements ITransactionService {
	public async createTransaction(payload: ICreateTransaction) {
		const transaction = await Transaction.create(payload)

		return { referenceId: payload.referenceId }
	}

	public async updateTransaction(
		query: Partial<ITransaction>,
		payload: IUpdateTransaction,
	) {
		const updatedTransaction = await Transaction.update(query, payload)

		return {
			referenceId: updatedTransaction.referenceId,
		}
	}
}

export default new TransactionService()
