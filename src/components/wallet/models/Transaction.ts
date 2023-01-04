import { BaseModel } from '../../../db/model/BaseModel'

interface Transaction {
	id: number
	userId: number
	walletId: number
	recipientId?: number
	amount: number
	type: 'CREDIT' | 'DEBIT'
	status: 'PENDING' | 'SUCCESS' | 'FAILED'
	referenceId: string
}

class TransactionModel extends BaseModel<Transaction> {}

export default new TransactionModel('transactions')
