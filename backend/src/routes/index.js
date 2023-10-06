const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const User = require("../models/user");
const Security = require("../services/security");

/**
 * @swagger
 * tags:
 *     name: Authentication
 * /login:
 *     post:
 *         summary: Login
 *         tags: [Authentication]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             email:
 *                                 type: String
 *                             password:
 *                                 type: String
 *         responses:
 *             200:
 *                 description: L'objet User et le token d'authentification
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 user:
 *                                     type: object
 *                                     description: L'objet User qui vient de se connecter
 *                                 auth_token:
 *                                     type: String
 *                                     description: Le token d'authentification de l'utilisateur
 */
router.post("/login", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (email == null || password == null)
    return res
      .status(400)
      .send(Consts.standardErrorResponse(ErrorCodes.MISSING_PARAMS));

  User.findOne({ email: email }).then(async function (user) {
    if (user == null)
      return res
        .status(400)
        .send(Consts.standardErrorResponse(ErrorCodes.USER_NOT_FOUND));

    if (user.isCorrectPassword(password)) {
      let r = Consts.newResponse();
      r.user = await User.getOne({ _id: user._id });
      r.auth_token = user.setAuthToken();
      await user.save();

      return res.status(200).send(r);
    } else {
      return res
        .status(400)
        .send(Consts.standardErrorResponse(ErrorCodes.USER_INCORRECT_PASSWORD));
    }
  });
});

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
router.post("/logout", Security.authentication, function (req, res) {
  User.findById(req._id).then(async function (user) {
    user.auth_token = undefined;
    await user.save();

    return res.status(200).send(Consts.newResponse());
  });
});

module.exports = router;
