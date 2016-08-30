const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(request, response, next) {
  res.render( 'index', { title: 'Read Honey' } );
});

router.get('/login', function(request, response, next) {
  res.render( 'login');

  return;
  
});




module.exports = router;
