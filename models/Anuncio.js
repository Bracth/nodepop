"use strict";

const mongoose = require("mongoose");

// Definir esquema //

const anuncioSchema = mongoose.Schema({
  name: { type: String, index: true, required: true },
  sell: { type: Boolean, index: true, default: true },
  price: { type: Number, index: true, min: 0.1, required: true },
  photo: { type: String, required: true },
  tags: {
    type: [String],
    index: true,
    enum: ["lifestyle", "work", "mobile", "motor"],
    required: true,
  },
});

// Creamos metodo estatico //

anuncioSchema.statics.lista = function (filtros, skip, limit, select, sort) {
  const query = Anuncio.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
};

// Creamos el modelo //

const Anuncio = mongoose.model("Anuncios", anuncioSchema);

// Exportamos el modelo //

module.exports = Anuncio;
