const express = require('express');
const logout = require('express-passport-logout');
const router = express.Router();
const database = require('../database')
const bodyparser = require('body-parser')
const debug = require('debug')('readhoney:routes:book')

const passport = require ('../passport')
const authOptions = {
  successRedirect: '/',
  failureRedirect: '/book/landing'
}

router.get('/booklisting', (request, response, next) => {
  database.getAllBooks()
    .then( books => response.render ('booklisting', { books:books }))
    .catch(error => response.send ({error, message: 'no books showing'}))

})

router.get('/', (request, response, next) => {
  debug( 'User Info', request.user )

  response.render('book');
})

router.get('/:id', (request, response, next) => {

    database.getBookById( request.params.id )
    .then( book => response.render('details', { book}))
    .catch(error => response.send ({error, message: 'no book detail showing'}))
})


router.post( '/book', (request, response, next) => {
  // debug( 'User Info', request.user )

  const { id } = request.user
  const { title, author, image_url } = request.body
  
  database.createBook( title, author, image_url )
    .then( book_id => database.createOwnedBook( book_id.id, id ))
    .then( result => response.redirect( '/' ) )
    .catch( error => response.send({ message: error.message }))
})

router.get( '/delete', (request, response, next) => {

  database.deleteBook( request.params.id )
  .then( book => response.render('booklisting', { book }))
  .catch( error => response.send({error, message: 'did not delete'}))

})

module.exports = router;
