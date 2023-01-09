import { BaseModel } from '../../../db/model/BaseModel'
import { IWallet, IWalletModel } from '../../../types/wallet'

class WalletModel extends BaseModel<IWallet> implements IWalletModel<IWallet> {}

export default new WalletModel('wallets')
