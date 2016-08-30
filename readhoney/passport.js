const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./database').User;
// const bcrypt = require('bcrypt');

const paramsOptions = {
	usernameField: 'email'
}

const findUser = ( email, encrypted_password ) => {
	return User.find (email, encrypted_password)
}

const findUserById = id => {
	return User.findbyId(id)
}


const strategy = new LocalStrategy( paramsOptions, (email, encrypted_password, done) => {
	findUser( email, encrypted_password )
	 .then( user => {
		if( user === null ){
			done( null, false, { message: 'Incorrect email or password'})
		} else {
			done( null, user)
		 }
		})
		 .catch( error => done( err ))

})

passport.use( strategy )

passport.serializeUser( (user, done ) =>  done( null, user.id ) ) 

passport.deserializeUser( (id, done) => {
	findUserById( id )
	.then( user => done(null, user))
	 .catch( error => done( error, null))
} )

module.exports = passport 