const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const Shortener = require("../models/shortener");
const {generate} = require("shortid");
const BASE_URL = "http://localhost:3010/"

router.post("/", async (req, res) => {
    const {shortUrl, longUrl} = req.body;
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

router.get("/:shortUrl", (req, res, next) => {
    let shortUrl = req.params.shortUrl;
    Shortener.findOne({shortUrl: "http://localhost:3010/" + shortUrl}).then(async (shortener) => {
        if (shortener == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        res.redirect(shortener?.longUrl.toString());
        next();
    }, (err) => Consts.errorFallback(err, res));
});

router.get("/", (req, res) => {
    Shortener.find({}).then(async (shorteners) => {
        let r = Consts.newResponse();
        r.shorteners = shorteners;
        return res.status(200).send(r);
    }, (err) => Consts.errorFallback(err, res));
});


module.exports = router;
