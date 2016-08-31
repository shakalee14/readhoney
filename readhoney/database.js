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


//create book first
//then 

//insert new books
const createWantedBook = (title, author) => {
  const sql = `
    INSERT INTO
     wanted_books(title, author)
    VALUES 
     ($1, $2)
    RETURNING
     *
  `
  const bookattributes = [title, author]

  return db.any(sql, [bookattributes])
}

const createOwnedBook = (title, author) => {
  const sql = `
    INSERT INTO
     owned_books(title, author)
    VALUES 
     ($1, $2)
    RETURNING
     *
  `
  const bookattributes = [title, author]
  
  return db.any(sql, [bookattributes])
}

module.exports = {
  User, 
  createOwnedBook,
  createWantedBook
};

