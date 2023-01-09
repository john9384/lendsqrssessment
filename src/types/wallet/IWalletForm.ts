export interface TransactionBasePayload {
	userId: number
	amount: string | number
}

export interface Transfer extends TransactionBasePayload {
	recieverEmail: string
}
