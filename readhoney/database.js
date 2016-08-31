const databaseName = 'readhoney'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)


const User = {
  find: (email, encrypted_password) => {
    return db.oneOrNone('SELECT * FROM users WHERE email=$1', [email]
   )
  },

  findById: id => db.one('SELECT * FROM users WHERE id=$1', [id]),
  createOne: (email, encrypted_password) => {
    return db.one(
      'INSERT INTO users(email, encrypted_password) VALUES ($1, $2) RETURNING id',
      [email, encrypted_password]
    )
  }
}

const createBook = (title, author, image) => {
  const sql = `INSERT INTO books( title, author, image_url ) VALUES ( $1, $2, $3 ) RETURNING id`

  return db.one( sql, [title, author, image] )
}

const createWantedBook = (book_id, user_id) => {
  const sql = `INSERT INTO wanted_books( book_id, user_id, created_at ) VALUES ( $1, $2, now() ) RETURNING *`

  return db.one( sql, [ parseInt(book_id), parseInt(user_id) ] )
}

const createOwnedBook = (book_id, user_id) => {
  const sql = `INSERT INTO owned_books( book_id, user_id, created_at ) VALUES ( $1, $2, now() ) RETURNING *`
  console.log( 'createOwnedBook', book_id, user_id )

  return db.one( sql, [ parseInt(book_id), parseInt(user_id) ] )
}

module.exports = {
  User, 
  createBook,
  createWantedBook,
  createOwnedBook
};

