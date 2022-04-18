const mongoose = require("mongoose");

// Manejamos errores de conexion con mongo //

mongoose.connection.on("error", (err) => {
  console.log("Error de conexion a MongoDB", err);
  process.exit(1);
});

// Avisamos por consola si nos conectamos a la BD //

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en la DB:", mongoose.connection.name);
});

// Nos conectamos a la base de datos //

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

module.exports = mongoose.connection;
