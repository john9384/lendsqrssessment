import { BaseModel } from '../../../db/model/BaseModel'
import { ITransaction, ITransactionModel } from '../../../types/wallet'

class TransactionModel
	extends BaseModel<ITransaction>
	implements ITransactionModel<ITransaction> {}

export default new TransactionModel('transactions')
