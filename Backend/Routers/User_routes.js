const express = require("express");
const { login, logout, register } = require("../Controllers/User_contoller.js");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
