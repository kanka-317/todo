const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
        title: "Task Management API",
        version: "1.0.0",
        description: "API documentation for the Task Management application",  
        contact: {
            name: "kanka das",
            email: "daskanka20@gmail.com"
        } 
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "..", "**/*.js")],
};

const specs = swaggerJsdoc(options);
module.exports = specs;