import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('transactions', table => {
		table.increments().primary()
		table.integer('userId')
		table.integer('walletId')
		table.string('recipientId')
		table.integer('amount')
		table.string('type')
		table.string('status').defaultTo('PENDING')
		table.string('referenceId')
		table.timestamps(true)
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('transactions')
}
