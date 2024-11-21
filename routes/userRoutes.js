const express = require("express");
const router = express.Router();
const { userRegister } = require("../controllers/userControllers");
const registerValidation = require("../validators/userValidators");

router.route("/register").post(registerValidation, userRegister);

module.exports = router;
