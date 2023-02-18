const express = require("express");


const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation } = require("../../middlewares");
const {registerSchema, loginSchema} = require('../../models/userModel')

const router = express.Router();

router
  .post("/register", validation(registerSchema) ,ctrlWrapper(ctrl.register))
  .post("/login", validation(loginSchema), ctrlWrapper(ctrl.login))
  .post("/logout", authentificate, ctrlWrapper(ctrl.logout))

module.exports = router