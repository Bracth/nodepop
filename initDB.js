// Conexion a la base base de datos //

const dbConnection = require("./lib/connectMongoose");
const anuncioData = require("./initDB.anuncios.json");

// Cargar modelos //

const Anuncio = require("./models/Anuncio");
const User = require("./models/User");

async function main() {
  await initAnuncios();

  await initUsers();

  dbConnection.close();
}

main().catch((err) => console.log("Hubo un error", err));

async function initAnuncios() {
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios`);

  const anuncios = await Anuncio.insertMany(anuncioData);
  console.log(`Creados ${anuncios.length} anuncios`);
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} Users`);

  const users = await User.insertMany([
    {
      email: "user@example.com",
      password: await User.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${users.length} usuarios`);
}
