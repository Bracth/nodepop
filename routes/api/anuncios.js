const { json } = require("express");
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
var createError = require("http-errors");
const fs = require("fs");

const Anuncio = require("../../models/Anuncio.js");

// config multer to upload images
const multer = require("multer");
const path = require("path");
const { dirname } = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage });

// GET /api/anuncios //
// Devuelve una lista de anuncios //

router.get("/", async (req, res, next) => {
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

    const anuncios = await Anuncio.lista(filtros, skip, limit, select, sort);
    res.json({ result: anuncios });
  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios:id //
// Devuleve un anuncio //

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const anuncio = await Anuncio.findOne({ _id: id });
    if (!anuncio) {
      next(createError(404));
      return;
    }
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios //
// Crea un nuevo anuncio //

router.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    const anuncioData = req.body;
    anuncioData.photo = "." + req.file.path.split("public")[1];
    console.log(anuncioData.photo);

    const anuncio = new Anuncio(anuncioData);

    const anuncioGuardado = await anuncio.save();
    res.status(201).json({ result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/anuncios:id //
// Elimina un anuncio //

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Anuncio.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});

// PUT /api/anuncio:id //
// Actualiza un anuncio //

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncioData = req.body;
    let anuncioActualizado;

    try {
      anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
        new: true,
      });
    } catch (err) {
      next(createError(422, "invalid id"));
      return;
    }

    if (!anuncioActualizado) {
      next(createError(404));
      return;
    }

    res.json({ result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
