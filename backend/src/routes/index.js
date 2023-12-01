const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const User = require("../models/user");


/**
 * @swagger
 * tags:
 *     name: Authentication
 * /logout:
 *     post:
 *         summary: Logout
 *         tags: [Authentication]
 *         responses:
 *             200:
 *                 description: Le retour standard
 */
router.post("/logout", function (req, res) {
  User.findById(req._id).then(async function (user) {
    user.auth_token = undefined;
    await user.save();

    return res.status(200).send(Consts.newResponse());
  });
});

module.exports = router;
