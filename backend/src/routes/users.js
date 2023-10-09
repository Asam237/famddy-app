const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ErrorCode = require("../config/error_codes");
const Consts = require("../config/consts");
const Security = require("../services/security");

router.post("/register", async (req, res) => {
    const {full_name, email, password} = req.body;
    if (full_name === null || email === null || password === null) return res.status(400).send(Consts.standardErrorResponse(ErrorCode.MISSING_PARAMS))
    let user = User.register({
        full_name, email
    });
    user.setPassword(password);
    user = await user.save();
    let r = Consts.newResponse();
    r.user = user;
    return res.status(200).send(r)
}, (err) => Consts.errorFallback(err, res));


router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    if (email === null || password === null) return res.status(400).send(Consts.standardErrorResponse(ErrorCode.MISSING_PARAMS));
    User.findOne({email: email}).then(async (user) => {
        if (user === null) return res.status(400).send(Consts.standardErrorResponse(ErrorCode.INVALID_PARAMS));
        if (user.isCorrectPassword(password)) {
            let r = Consts.newResponse();
            r.user = await User.getOne({_id: user._id});
            r.user.auth_token = user.setAuthToken();
            await user.save();
            return res.status(200).send(r);
        } else {
            return res.status(400).send(Consts.standardErrorResponse(ErrorCode.INVALID_PARAMS));
        }
    }, (err) => Consts.errorFallback(err, res));
}, (err) => Consts.errorFallback(err, res));

router.get("/:me", Security.authentication, (req, res) => {
    const me = req.params.me;
    User.findOne({_id: me}).then(async (user) => {
        if (user == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCode.INVALID_PARAMS));
        let r = Consts.newResponse();
        r.user = user;
        return res.status(200).send(r);
    }, (err) => Consts.errorFallback(err, res));
});

module.exports = router;