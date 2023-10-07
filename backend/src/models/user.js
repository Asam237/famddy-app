const Model = require("./model")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const RandomString = require("randomstring");
const AUTH_TOKEN_STRING_SIZE = 64;


const User = mongoose.model("users", new mongoose.Schema({
    ...Model.base,
    full_name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    auth_token: {type: String},
}, {
    statics: {
        register(input) {
            return new User(input);
        }, getOne(query) {
            return User.findOne(query);
        },
    }, methods: {
        setPassword(password) {
            return this.password = bcrypt.hashSync(password, 10);
        }, isCorrectPassword(password) {
            return bcrypt.compareSync(password, this.password);
        },
        setAuthToken() {
            this.auth_token = RandomString.generate(AUTH_TOKEN_STRING_SIZE);
            return this.auth_token;
        },
    }
}));

module.exports = User;