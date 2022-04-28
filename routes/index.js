var express = require("express");
var router = express.Router();
const Anuncio = require("../models/Anuncio");
require("jimp");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const name = req.query.name;
    const sell = req.query.sell;
    const tags = req.query.tags;
    const price = req.query.price;
    const priceMax = req.query.priceMax;
    const priceMin = req.query.priceMin;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    const filtros = {};
    if (name) {
      filtros.name = { $regex: `^${name}`, $options: "i" };
    }
    if (sell) {
      filtros.sell = sell;
    }
    if (tags) {
      filtros.tags = { $in: tags };
    }
    if (price) {
      filtros.price = price;
    }
    if (priceMax) {
      filtros.price = { $lte: priceMax };
    }
    if (priceMin) {
      filtros.price = { $gte: priceMin };
    }
    if (priceMax && priceMin) {
      filtros.price = { $gte: priceMin, $lte: priceMax };
    }

    res.locals.anuncios = await Anuncio.lista(
      filtros,
      skip,
      limit,
      select,
      sort
    );

    res.render("index", { title: "Nodepop" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
