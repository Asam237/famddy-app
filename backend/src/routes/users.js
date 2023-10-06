const express = require("express");
const router = express.Router();
const Consts = require("../config/consts");
const ErrorCodes = require("../config/error_codes");
const User = require("../models/user");

/**
 * @swagger
 * tags:
 *     name: Users
 * /users:
 *     post:
 *         summary: Création d'un nouvel utilisateur
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             full_name:
 *                                 type: String
 *                             username:
 *                                 type: String
 *                             email:
 *                                 type: String
 *                             password:
 *                                 type: Array
 *         responses:
 *             200:
 *                 description: L'objet User a ete cree
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 user:
 *                                     type: object
 *                                     description: L'objet User qui vient de se creer
 *                                 password:
 *                                     type: string
 *                                     description: le mot de passe du nouvel utilsateur
 */
router.post("/users", async (req, res) => {

    const {full_name, username, email, password} = req.body;

    if (full_name == null || username == null || email == null || password == null)
        return res.status(400).send(Consts.standardErrorResponse(ErrorCodes.MISSING_PARAMS));

    let createdUser = User.register({
        full_name,
        username,
        email,
    });
    createdUser.setPassword(password);
    createdUser = await createdUser.save();
    let r = Consts.newResponse();
    r.user = createdUser;
    return res.status(200).send(r);
});

/**
 * @swagger
 * tags:
 *     name: User
 * /users/login:
 *     post:
 *         summary: Login
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             username:
 *                                 type: String
 *                             password:
 *                                 type: String
 *         responses:
 *             200:
 *                 description: L'objet User
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 user:
 *                                     type: object
 *                                     properties:
 *                                      username:
 *                                          type: string
 *                                      password:
 *                                          type: string
 */
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (username === null || password === null) return res.status(400).send(Consts.standardResponse(ErrorCode.MISSING_PARAMS));
    User.findOne({username: username}).then(async (user) => {
        if (user === null) return res.status(400).send(Consts.standardResponse(ErrorCode.INVALID_PARAMS));
        if (user.isCorrectPassword(password)) {
            let r = Consts.newResponse();
            r.user = await User.getOne({_id: user._id});
            r.user.auth_token = user.setAuthToken();
            await user.save();
            return res.status(200).send(r);
        } else {
            return res.status(400).send(Consts.standardResponse(ErrorCode.INVALID_PARAMS));
        }
    }, (err) => Consts.errFallback(err, res));
}, (err) => Consts.errFallback(err, res));


module.exports = router;
