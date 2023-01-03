import { db } from '../connectDB'

export class BaseModel<T extends {}> {
	tableName: string

	constructor(tableName: string) {
		this.tableName = tableName
	}

	public async create(data: any) {
		const entity = await db<T>(this.tableName).returning(['id']).insert(data)
		return entity
	}

	public async read(query: any) {
		const entity = await db<T>(this.tableName).select().where(query).first()
		return entity
	}

	public async update() {}
	public async destroy() {}
}
