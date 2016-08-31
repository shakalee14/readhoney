const express = require('express');
const logout = require('express-passport-logout');
const router = express.Router();
const database = require('../database')
const bodyparser = require('body-parser')

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
  // if (!request.loggedIn){
    response.render('book');
    return;


  Promise.all([
    database.wanted_books(req.session.userId)
  ])
    .then(results => {
      const wbooks = results[1]
      const obooks = results[2]
      res.render('book', {
        User: User,
        wbooks: wbooks,
        obooks: obooks, 
      });
    })
    .catch(error => {
      res.render('error', {
        error: error
      })
    })
});

router.post('/book', (request, response, next) => {
  const { title, author } = request.body

  let newWantedBook = request.body.newWantedBook
  newWantedBook = request.session
  
  database.createWantedBook( newWantedBook )
     .then( newWantedBook => {
      response.redirect('/')
     })
     .catch(error => {
      response.send('Did not create new wanted book')
     })
   })




module.exports = router;
