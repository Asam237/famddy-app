// create admin user
require('dotenv').config({path: '../.env'});

const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(async function () {
    console.log("connected to database");

    console.log("registering main admin");
    const User = require('../models/user');
    let user = new User();
    user.first_name = "Admin";
    user.last_name = "Admin";
    user.email = "admin@caelis-tech.studio";
    user.setPassword("password");
    user.setAuthToken();
    user.roles = [
        User.enums.role.readManagement,
        User.enums.role.writeManagement,
        User.enums.role.readAdministration,
        User.enums.role.writeAdministration,
        User.enums.role.readFinances,
        User.enums.role.writeFinances,
        User.enums.role.readAcademic,
        User.enums.role.writeAcademic,
        User.enums.role.reportAdmin,
    ];
    await user.save();
    console.log(`main admin registered with email ${user.email}`);
}, function (err) {
    console.log(err);
});