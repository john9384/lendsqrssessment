interface ITransaction {
	id: number
	userId: number
	walletId: number
	recipientId?: number
	amount: number
	type: 'CREDIT' | 'DEBIT'
	status: 'PENDING' | 'SUCCESS' | 'FAILED'
	referenceId: string
}

export default ITransaction
