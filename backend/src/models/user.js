const mongoose = require("mongoose");
const Model = require("./model");
const bcrypt = require("bcrypt");
const RandomString = require("randomstring");
const AUTH_TOKEN_STRING_SIZE = 64;
const PASSWORD_STRING_SIZE = 10;
const SALT = 12;

const userSelect = Model.baseSelect + "_id " + "first_name " + "last_name " + "email " + "roles " + "active ";
const UserEnums = {
  role: {
    readManagement: "READ_MANAGEMENT",
    writeManagement: "WRITE_MANAGEMENT",
    readAdministration: "READ_ADMINISTRATION",
    writeAdministration: "WRITE_ADMINISTRATION",
    readFinances: "READ_FINANCES",
    writeFinances: "WRITE_FINANCES",
    readAcademic: "READ_ACADEMIC",
    writeAcademic: "WRITE_ACADEMIC",
    reportAdmin: "REPORT_ADMIN",
    reporter: "REPORTER",
  },
};

/**
 * @swagger
 * components:
 *     schemas:
 *         User:
 *             type: object
 *             properties:
 *                 first_name:
 *                     type: string
 *                 last_name:
 *                     type: string
 *                 email:
 *                     type: string
 *                 roles:
 *                     type: array
 *                     enum:
 *                         - READ_MANAGEMENT
 *                         - WRITE_MANAGEMENT
 *                         - READ_ADMINISTRATION
 *                         - WRITE_ADMINISTRATION
 *                         - READ_FINANCES
 *                         - WRITE_FINANCES
 *                         - READ_ACADEMIC
 *                         - WRITE_ACADEMIC
 *                         - REPORT_ADMIN
 *                         - REPORTER
 *                 active:
 *                     type: boolean
 */
const User = mongoose.model(
  "users",
  Model.withMiddlewares(new mongoose.Schema(
      {
        ...Model.base,
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        auth_token: { type: String },
        roles: [
          {
            type: String,
            enum: [
              UserEnums.role.readManagement,
              UserEnums.role.writeManagement,
              UserEnums.role.readAdministration,
              UserEnums.role.writeAdministration,
              UserEnums.role.readFinances,
              UserEnums.role.writeFinances,
              UserEnums.role.readAcademic,
              UserEnums.role.writeAcademic,
              UserEnums.role.reporter,
              UserEnums.role.reportAdmin,
            ],
          },
        ],
        active: { type: Boolean, default: true },
      },
      {
        statics: {
          select: userSelect,
          getOne(query) {
            return User.findOne(query).select(userSelect);
          },
          register(input) {
            return new User(input);
          },
          findPaginated(query, page, size) {
            return User.find(query)
                .select(userSelect)
                .skip(page * size)
                .limit(size);
          },
          count(query) {
            return User.find(query).countDocuments();
          },
          enums: UserEnums,
        },
        methods: {
          isCorrectPassword(password) {
            return bcrypt.compareSync(password, this.password);
          },
          setPassword(password) {
            return (this.password = bcrypt.hashSync(password, SALT));
          },
          resetPassword() {
            let newPassword = RandomString.generate(PASSWORD_STRING_SIZE);
            this.setPassword(newPassword);
            return newPassword;
          },
          setAuthToken() {
            this.auth_token = RandomString.generate(AUTH_TOKEN_STRING_SIZE);
            return this.auth_token;
          },
        },
      }
  ))
);

module.exports = User;
