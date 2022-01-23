var express = require('express');
var router = express.Router();
const Anuncio = require("../models/Anuncio")

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
     const name = req.query.name;
        const sell = req.query.sell;
        const tags = req.query.tags;
        const price = req.query.price;
        const skip = req.query.skip;
        const limit = req.query.limit;
        const select = req.query.select;
        const sort = req.query.sort;
        const filtros = {};
        if (name) {
            filtros.name = name
        }
        if (sell) {
            filtros.sell = sell
        }
        if (tags) {
            filtros.tags = tags
        }
        if (price) {
            filtros.price = price
        }
    
  res.locals.anuncios = await Anuncio.lista(filtros,skip,limit,select,sort);
  
  res.render('index', { title: 'Express' });
  } catch (err) {
    next(err);
  }
 
});

module.exports = router;
