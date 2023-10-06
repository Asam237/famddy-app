require('dotenv').config();
const ErrorCodes = require("./error_codes");

const badResponse = function(){
    return {error: true, error_code: ErrorCodes.SERVER_ERROR};
};

module.exports = {
    APP_NAME: process.env.APP_NAME,
    MONGODB_URL: process.env.MONGODB_URL,
    ENV: process.env.ENV,
    badResponse: badResponse,
    newResponse: function(){
        return {error: false, error_code: ErrorCodes.SUCCESS};
    },
    standardErrorResponse: function (errorCode) {
        return {error: true, error_code: errorCode};
    },
    errorFallback: function (err, res) {
        console.log(err);
        return res.status(500).send(badResponse());
    }
};