export type ITransactionType = 'CREDIT' | 'DEBIT'
export type ITransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED'

export interface ICreateTransaction {
	userId: number
	walletId: number
	recipientId?: number
	amount: number
	type: ITransactionType
	status?: ITransactionStatus
	referenceId: string
}

export interface IUpdateTransaction {
	status: ITransactionStatus
}
