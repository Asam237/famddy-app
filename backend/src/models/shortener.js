const mongoose = require("mongoose");
const Model = require("./model");


const Shortener = mongoose.model(
    "shorteners",
    new mongoose.Schema({
        ...Model.base,
        longUrl: {type: String},
        shortUrl: {type: String},
    }, {
        statics: {
            register(input) {
                return new Shortener(input);
            }
        }
    })
);

module.exports = Shortener;