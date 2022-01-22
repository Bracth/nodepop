const mongoose = require("mongoose");

// Definir esquema //

const anuncioSchema = mongoose.Schema({
    name: { type: String, index: true },
    sell: { type: Boolean, index: true },
    price: { type: Number, index: true, min: 0.1 },
    photo: { type: String, index: true },
    tags: { type: [String], index: true }
});

// Creamos el modelo //

const Anuncio = mongoose.model("Anuncios", anuncioSchema);

// Exportamos el modelo //

module.exports = Anuncio;