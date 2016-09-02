const databaseName = 'readhoney'
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
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

const createBook = (title, author, image, wanted) => {
  const sql = `INSERT INTO books( title, author, wanted, image_url) VALUES ( $1, $2, $3, $4) RETURNING id`

  return db.one( sql, [title, author, image, wanted] )
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

const getAllBooks = () => {
  return db.any( 'SELECT * FROM books')
}

const search = searchTerm => {
  const term = searchTerm.toLowerCase()
  const sql = `SELECT * FROM books WHERE lower(title) LIKE '%${term}%' OR lower(author) LIKE '%${term}%'`

  return db.any( sql )
}

const getOwnedBooks = () => {
  return db.any ( 'SELECT * FROM books WHERE wanted=FALSE')
}

const getWantedBooks = () => {
  return db.any ( 'SELECT * FROM books WHERE wanted=TRUE')
}


const getBookById = ( book_id) => {
  const sql = `SELECT * FROM books WHERE books.id=$1`

  // const variables = [
  // attributes.id,
  // attributes.title,
  // attributes.author,
  // attributes.image_url
  // ]
  return db.one( sql, [book_id] )
}

const deleteBook = (book_id) => {
  const sql = `DELETE FROM books WHERE books.id=$1 RETURNING *`

  return db.one(sql, [book_id])
}

const updateBook = (id, title, author, image_url) => {
  const sql = `UPDATE books SET title=$1, author=$2, image_url=$3 WHERE id=$4`

  return db.none( sql, [title, author, image_url, id] )
}

// const wantedBook = ( book_id ) => {
//   const sql = ` UPDATE books SET wanted=true WHERE id=$1`

//   return db.oneOrNone(sql, [book_id])
// }

// const ownedBook = ( book_id ) => {
//   const sql = ` UPDATE books SET wanted=false WHERE id=$1`

//   return db.oneOrNone(sql, [book_id])
// }


module.exports = {
  User,
  createBook,
  getAllBooks,
  getBookById,
  createWantedBook,
  createOwnedBook,
  deleteBook,
  getWantedBooks,
  getOwnedBooks,
  updateBook,
  search
  // wantedBook,
  // ownedBook,
};
