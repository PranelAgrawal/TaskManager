const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.1.0",
        info:{
            title: "Task Manager API",
            version: "0.1.0",
            description: "API application made with express and documented with swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Pranel",
                email: "pranel.a@ahduni.edu.in",
            },
        },
        servers: [
            {
                url: "http://localhost:3001", //mandatory to add url prop in this
            },
        ],
    },
    apis: [path.join(__dirname, "..", "**/*.js")],
};

const specs = swaggerJsdoc(options);

module.exports = specs;