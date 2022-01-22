const { json } = require("express");
const express = require("express");
const req = require("express/lib/request");
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

// GET /api/anuncios:id //
// Devuleve un anuncio //

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const anuncio = await Anuncio.findOne({_id: id})
        if (!anuncio) {
             next(createError(404));
             return
        }
         res.json({result:anuncio})
        
    } catch (err) {
        next(err);
    }
})

// POST /api/anuncios //
// Crea un nuevo anuncio //

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
})

// PUT /api/anuncio:id //
// Actualiza un anuncio //

router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const anuncioData = req.body;
        let anuncioActualizado;
        
        try {
            anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
                new: true
            })
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
})

module.exports = router;