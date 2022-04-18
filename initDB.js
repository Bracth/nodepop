const readline = require("readline");

// Conexion a la base base de datos //

const dbConnection = require("./lib/connectMongoose");
const anuncioData = require("./initDB.anuncios.json");

// Cargar modelos //

const Anuncio = require("./models/Anuncio");
const User = require("./models/User");
const { resolveCaa } = require("dns");

async function main() {
  const deleteAnswer = await question(
    "are you sure do you want to delete the data base? respond yes if you are sure"
  );
  if (!deleteAnswer) {
    process.exit(0);
  }

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

function question(text) {
  return new Promise((resolve, reject) => {
    // Connect readline to the console
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // make the question
    rl.question(text, (answer) => {
      rl.close();
      if (answer.toLowerCase() === "yes") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
