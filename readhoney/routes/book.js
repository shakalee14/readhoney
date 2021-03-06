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
  const { q: query } = request.query

  if( query === undefined ) {
    database.getAllBooks()
      .then( books => response.render ('booklisting', { books }))
      .catch(error => response.send ({error, message: 'no books showing'}))
  } else {
    database.search( query )
      .then( books => response.render ('booklisting', { books }))
      .catch(error => response.send ({error, message: 'no books showing'}))
  }
})

router.get('/owned', (request, response, next) => {
  database.getOwnedBooks()
    .then( books => response.render ('owned', { books:books }))
    .catch(error => response.send ({error, message: 'no owned'}))
})

router.get('/wanted', (request, response, next) => {
  database.getWantedBooks()
    .then( books => response.render ('wanted', { books:books }))
    .catch(error => response.send ({error, message: 'no wanted'}))
})

router.get( '/delete/:id', (request, response, next) => {
  database.deleteBook( request.params.id )
    .then( book => response.redirect('/'))
    .catch( error => response.send({error, message: error.message}))
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
  const { title, author, image_url, wanted } = request.body

  database.createBook( title, author, image_url, wanted )
    .then( book_id => database.createOwnedBook( book_id.id, id ))
    .then( result => response.redirect( '/' ) )
    .catch( error => response.send({ message: error.message }))
})

router.get( '/edit/:id', (request, response) => {
  database.getBookById( request.params.id )
    .then( book => response.render( 'edit', { book } ))
    .catch( error => response.send({ message: error.message }))
})

router.post( '/update/:id', (request, response) => {
  const { id } = request.params
  const { title, author, image_url } = request.body

  database.updateBook( id, title, author, image_url )
    .then( result => response.redirect( `/book/${id}` ) )
    .catch( error => response.send({ message: error.message }))
})

module.exports = router;
