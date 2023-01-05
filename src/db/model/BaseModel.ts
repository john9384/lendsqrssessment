import { db } from '../connectDB'
import { IBaseModel } from '../interface/IBaseModel'

export class BaseModel<T extends {}> implements IBaseModel<T> {
	tableName: string

	constructor(tableName: string) {
		this.tableName = tableName
	}

	public async create(data: any) {
		await db<T>(this.tableName).insert(data)
		const entity = await this.read(data)
		return entity as T
	}

	public async read(query: any) {
		const entity = await db<T>(this.tableName).select().where(query).first()
		return entity as T | null
	}

	public async update(query: Partial<T>, data: any) {
		await db<T>(this.tableName).where(query).update(data)
		const updatedEntity = await this.read(query)
		return updatedEntity as T
	}

	public async destroy() {}
}
