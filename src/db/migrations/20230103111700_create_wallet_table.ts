import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('wallets', table => {
		table.increments().primary()
		table.integer('userId').unique()
		table.integer('balance')
		table.timestamps(true)
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('wallets')
}
