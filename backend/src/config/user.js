const mongoose = require("mongoose");
const Model = require("../models/model");

const User = mongoose.models("users", new mongoose.Schema({
    ...Model.base,
    full_name: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    auth_token: {type: String}
}, {
    statics: {
        getOne(query) {
            return User.findOne(query);
        },
        register(input) {
            return new User(input);
        }
    },
    methods: {
        isCorrectPassword(password) {
            return bcrypt.compareSync(password, this.password);
        },
        setPassword(password) {
            return (this.password = bcrypt.hashSync(password, 12));
        },
        setAuthToken() {
            this.auth_token = RandomString.generate(64);
            return this.auth_token;
        }
    }
}));