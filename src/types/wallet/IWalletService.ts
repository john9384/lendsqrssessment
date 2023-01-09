import IWallet from './IWallet'
import { TransactionBasePayload, Transfer } from './IWalletForm'

interface IWalletService {
	createWallet(userId: number): Promise<IWallet>
	getWallet(query: Partial<IWallet>): Promise<IWallet | null>
	deposit(payload: TransactionBasePayload): Promise<{ paymentAuthUrl: string }>
	withdraw(payload: TransactionBasePayload): Promise<{ balance: number }>
	transfer(payload: Transfer): Promise<{ balance: number }>
	completeTransaction(referenceId: string): Promise<{ balance: number }>
}

export default IWalletService
