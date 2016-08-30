const databaseName = 'readhoney'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

const getBookAuthors = id => {
	const sql = `
		SELECT
		 *
		FROM 
		 book_authors
		JOIN
		 authors 
		ON 
		 book_authors.author_id=authors.id	
	`
	return db.any(sql, [id])
}

const getAllBooksbyId = id => {
	const sql = `
		SELECT
		 *
		FROM 
		 book_authors
		JOIN
		 books
		ON 
		 book_authors.book_id=books.id	
	`
	return db.any(sql, [id])
}

const User = {
	find: (email, encrypted_password) => {
		return db.oneOrNone(
			'SELECT * FROM users WHERE email=$1 AND encrypted_password=$2', [email, encrypted_password]
	 )
	},

	findById: id => db.one('SELECT * FROM users WHERE id=$1', [id]),
	createOne: (email, encrypted_password) => {
		return db.one(
			'INSERT INTO users(email, encrypted_password) VALUES ($1, $2) RETURNING *',
			[email, encrypted_password]
		)
	}
}



module.exports = {
	getBookAuthors,
	getAllBooksbyId,
  User
}


