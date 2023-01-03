import { BaseModel } from '../../../db/model/BaseModel'

interface Transaction {
	id: number
	userId: number
	walletId: number
	type: 'CREDIT' | 'DEBIT'
	status: 'PENDING' | 'SUCCESS' | 'FAILED'
}

class TransactionModel extends BaseModel<Transaction> {}

export default new TransactionModel('transactions')
