const { json } = require("express");
const express = require("express");
const router = express.Router();
var createError = require('http-errors');

const Anuncio = require("../../models/Anuncio.js");

// GET /api/anuncios //
// Devuelve una lista de anuncios //

router.get("/", async (req, res, next) => {
    try {
    const anuncios = await Anuncio.find();
    res.json({ result: anuncios})
    } catch (err) {
        next(err);
    }
})

// POST /api/agentes //
// Crea un nuevo agente //

router.post("/", async (req, res, next) => {
    
    try {
    const anuncioData = req.body;
    console.log(req.body);
    
    const anuncio = new Anuncio(anuncioData);
    
    const anuncioGuardado = await anuncio.save();
    res.status(201).json({ result: anuncioGuardado });
    } catch (err) {
        next(err);
    }
    
})

module.exports = router;