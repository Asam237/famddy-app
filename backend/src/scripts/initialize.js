// create admin user
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(
  async function () {
    console.log("connected to database");

    console.log("registering main admin");
    const User = require("../models/user");
    let user = new User();
    user.first_name = "Admin";
    user.last_name = "Admin";
    user.email = "abbasaliaboubakar@gmail.com";
    user.setPassword("password");
    user.setAuthToken();
    await user.save();
    console.log(`main admin registered with email ${user.email}`);
  },
  function (err) {
    console.log(err);
  }
);

