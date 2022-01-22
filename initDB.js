// Conexion a la base base de datos //

const dbConnection = require("./lib/connectMongoose");
const anuncioData = require("./initDB.anuncios.json");

// Cargar modelos //

const Anuncio = require("./models/Anuncio")

async function main() {
    
    await initAnuncios();
    
    dbConnection.close();
}

main().catch(err => console.log("Hubo un error", err))

async function initAnuncios() {
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${ deleted.deletedCount } anuncios`)
    
    const anuncios = await Anuncio.insertMany(anuncioData);
    console.log(`Creados ${ anuncios.length } anuncios`)
}