var express = require('express');
var router = express.Router();
const Anuncio = require("../models/Anuncio")

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
  res.locals.anuncios = await Anuncio.find();
  
  res.render('index', { title: 'Express' });
  } catch (err) {
    next(err);
  }
 
});

module.exports = router;
