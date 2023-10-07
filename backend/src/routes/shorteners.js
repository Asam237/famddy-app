const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const Shortener = require("../models/shortener");
const {generate} = require("shortid");

router.post("/", async (req, res) => {
    const {shortUrl, longUrl} = req.body;
    const BASE_URL = "http://localhost:3010/"
    if (longUrl == null || shortUrl == null)
        return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.MISSING_PARAMS));
    let createdShortener = Shortener.register({
        shortUrl: BASE_URL + "/" + generate(),
        longUrl
    });
    createdShortener = await createdShortener.save();
    let r = Consts.newResponse();
    r.shortener = createdShortener;
    return res.status(200).send(r);
});

router.get("/:shortUrl", (req, res) => {
    let shortUrl = req.params.shortUrl;
    Shortener.findOne({shortUrl: shortUrl}).then(async (shortener) => {
        if (shortener == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        return res?.redirect(shortener.longUrl);
    }, (err) => Consts.errorFallback(err, res));
});


module.exports = router;
