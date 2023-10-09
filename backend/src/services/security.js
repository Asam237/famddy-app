const User = require('../models/user');
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const sha1 = require('js-sha1');

const userAuth = function (req, res, next) {
    let uid = req.headers.uid;
    let hash = req.headers.hash;

    User.findById(uid)
        .then(function (user) {
            if (user == null)
                return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));

            let build = sha1(uid + '$' + user.auth_token);
            if (build === hash) {
                req._id = user._id;
                next();
            } else return res.status(401).send(Consts.standardErrorResponse(ErrorCodes.INVALID_TOKEN));
        }, (err) => Consts.errorFallback(err, res));
};

module.exports = {
    authentication: userAuth
};