const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        info: {
            title: "Nodepop",
            version: "0.1",
            description: "API de Anuncios"
        }
    },
    apis: ["swagger.yaml"]
};

const specification = swaggerJSDoc(options);

module.exports = [swaggerUi.serve, swaggerUi.setup(specification)];