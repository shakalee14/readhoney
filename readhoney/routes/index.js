const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index', { title: 'Read Honey' } );
});

router.get('/login', function(req, res, next) {
  res.render( 'login');

  return;
  
});




module.exports = router;
