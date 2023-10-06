const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const specs = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Famddy REST API Documentation",
            version: "0.1.0"
        }
    },
    apis: ["./models/*.js", "./routes/*.js"]
});
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {MONGODB_URL} = require('./src/config/consts');
mongoose.connect(MONGODB_URL).then(function () {
    const userRouter = require("./src/routes/users");
    console.log("connected to database");
    app.use("/", userRouter);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
});

module.exports = app;
