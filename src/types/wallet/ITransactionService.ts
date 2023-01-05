import ITransaction from './ITransaction'
import { ICreateTransaction, IUpdateTransaction } from './ITransactionForm'

interface ITransactionService {
	createTransaction(
		payload: ICreateTransaction,
	): Promise<{ referenceId: string }>
	updateTransaction(
		query: Partial<ITransaction>,
		data: IUpdateTransaction,
	): Promise<{ referenceId: string }>
}

export default ITransactionService
