const express = require("express");
const router = express.Router();
const Shortener = require("../models/shortener");
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");

const BASE_URL = process.env.BASE_URL;

router.get("/:shortUrl", (req, res, next) => {
    let shortUrl = req.params.shortUrl;
    Shortener.findOne({shortUrl: BASE_URL + shortUrl}).then(async (shortener) => {
        if (shortener == null)
            return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.INVALID_PARAMS));
        return res.redirect(shortener?.longUrl.toString());
    }, (err) => Consts.errorFallback(err, res));
});

module.exports = router;
