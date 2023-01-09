import { BaseModel } from '../../../db/model/BaseModel'
import { IUser, IUserModel } from '../../../types/user'

class UserModel extends BaseModel<IUser> implements IUserModel<IUser> {}

export const User = new UserModel('users')
