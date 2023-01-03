import { BaseModel } from '../../../db/model/BaseModel'

interface Wallet {
	id: number
	userId: number
	balance: number
}

class WalletModel extends BaseModel<Wallet> {}

export const Wallet = new WalletModel('wallets')
