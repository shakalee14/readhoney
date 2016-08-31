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

/* GET home page. */
// if user loggedin devon suggestion

// router.get('/', function(req, res, next) {
//   Promise.all([wanted_books.all(), owned_books.all()])
//     .then( results => {
//       const [ wbooks, obooks] = results
//       res.render('landing', {results})
//     })
//   res.render( 'login');

//   return;
  
// });

router.get('/', (request, response, next) => {
  debug( 'User Info', request.user )

  response.render('book');
})

router.post( '/book', (request, response, next) => {
  debug( 'User Info', request.user )

  const { id } = request.user
  const { title, author, image_url } = request.body
  
  database.createBook( title, author, image_url )
    .then( book_id => database.createOwnedBook( book_id.id, id ))
    .then( result => response.redirect( '/' ) )
    .catch( error => response.send({ message: error.message }))
})

module.exports = router;
