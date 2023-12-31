const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const Shortener = require("../models/shortener");
const User = require("../models/user");
const {generate} = require("shortid");
const BASE_URL = process.env.BASE_URL;

router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;
    if (longUrl == null)
        return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.MISSING_PARAMS));
    let createdShortener = Shortener.register({
        shortUrl: BASE_URL + generate(),
        longUrl
    });
    createdShortener = await createdShortener.save();
    let r = Consts.newResponse();
    r.shortener = createdShortener;
    return res.status(200).send(r);
});

router.post("/of/user", async (req, res) => {
    const {longUrl, user} = req.body;
    if (longUrl == null || user == null)
        return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.MISSING_PARAMS));
    let createdShortener = Shortener.register({
        shortUrl: BASE_URL + generate(),
        longUrl,
        user
    });
    createdShortener = await createdShortener.save();
    let r = Consts.newResponse();
    r.shortener = createdShortener;
    return res.status(200).send(r);
});

router.get("/", (req, res) => {
    Shortener.find({}).then(async (shorteners) => {
        let r = Consts.newResponse();
        r.shorteners = shorteners;
        return res.status(200).send(r);
    }, (err) => Consts.errorFallback(err, res));
});

router.get("/of/:user", (req, res) => {
    let user = req.params.user;
    User.findOne({_id: user}).then(async (user) => {
        if (user == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        Shortener.find({user: user}).then(async (shorteners) => {
            let r = Consts.newResponse();
            r.shorteners = shorteners;
            return res.status(200).send(r);
        }, (err) => Consts.errorFallback(err, res));
    }, (err) => Consts.errorFallback(err, res));
});

router.delete("/:id", (req, res) => {
    const shortenerId = req.params.id;
    Shortener.deleteOne({_id: shortenerId}).then((shortener) => {
        if (shortener == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        let r = Consts.newResponse();
        r.message = "Deteled with success !";
        return res.status(200).send(r);
    }, (err) => Consts.errorFallback(err, res))
});

router.patch("/:id", (req, res) => {
    const shortenerId = req.params.id;
    const {longUrl} = req.body;
    Shortener.findOne({_id: shortenerId}).then(async (shortener) => {
        if (shortener == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        shortener.longUrl = longUrl;
        await shortener.save();
        let r = Consts.newResponse();
        r.shortener = shortener;
        return res.status(200).send(r);
    }, (err) => Consts.errorFallback(err, res))
});

module.exports = router;
