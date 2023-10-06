const User = require('../models/user');
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const sha1 = require('js-sha1');

const userAuth = function (req, res, next) {
    let uid = req.headers.uid;
    let timestamp = req.headers.timestamp;
    let hash = req.headers.hash;

    if (uid == null || timestamp == null || hash == null)
        return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_HEADERS));

    if (Date.now() - 30 * 1000 > timestamp) // 30 sec timeout
        return res.status(401).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));

    User.findById(uid)
        .select('_id auth_token active roles')
        .lean()
        .then(function (user) {
            if (user == null)
                return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
            if (user.active === false)
                return res.status(403).send(Consts.standardErrorResponse(ErrorCodes.NOT_AUTHORIZED));

            let build = sha1(uid + '$' + timestamp + '$' + user.auth_token);
            if (build === hash) {
                // authentification ok. On passe à la suite
                req._id = user._id;
                req.roles = user.roles;
                next();
            }
            else return res.status(401).send(Consts.standardErrorResponse(ErrorCodes.INVALID_TOKEN));
        }, (err) => Consts.errorFallback(err, res));
};

module.exports = {
    authentication: userAuth
};