export interface IBaseModel<T> {
	tableName: string
	create(payload: any): Promise<T>
	read(query: Partial<T>): Promise<T | null>
	update(query: Partial<T>, payload: any): Promise<T>
	destroy(): Promise<any>
}
