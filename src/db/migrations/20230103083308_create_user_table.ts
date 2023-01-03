import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', table => {
		table.increments().primary()
		table.string('firstname')
		table.string('lastname')
		table.string('email').unique()
		table.string('password')
		table.timestamps(true).defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('users')
}
