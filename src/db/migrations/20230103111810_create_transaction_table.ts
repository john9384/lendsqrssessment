import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('transactions', table => {
		table.increments().primary()
		table.integer('userId').unique()
		table.integer('walletId').unique()
		table.string('type')
		table.string('status')
		table.timestamps(true)
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('transactions')
}
