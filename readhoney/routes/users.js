const express = require('express');
const logout = require('express-passport-logout');
const router = express.Router();
const database = require('../database');
const passport = require ('../passport');

const authOptions = {
  successRedirect: '/',
  failureRedirect: '/users/login'
}

const User = require('../database').User

router.get( '/login', (request, response) => {
  response.render('auth/login')
})

router.post ( '/login', passport.authenticate( 'local', authOptions)) 

router.get( '/signup', (request, response) => { response.render('auth/signup') })

router.post ( '/signup', (request, response, next) => {
  const { email, password } = request.body

  User.createOne( email, password)
    .then(user => {
      request.login({id: user.id, email }, error => {
        if (error){
          response.render('error', { 
            error: error
          })
        }else{
          response.redirect('/')
        }

      })
    })
    .catch( error => {
      response.render('error', { 
        error: error
      })
    })
})

module.exports = router;
