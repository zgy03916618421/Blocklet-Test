const file = __dirname +  process.env.DATABASE_NAME
console.log("file", file)

const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: file	
	},
	useNullAsDefault: true
})

exports.knex =knex