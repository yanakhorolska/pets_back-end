const { Router } = require("express");

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { authentificate, validation } = require("../../middlewares");
const { schemas } = require('../../models/userModel')

const router = Router();

router
  .post("/register", validation(schemas.registerSchema), ctrlWrapper(ctrl.register))
  .post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login))
  .get("/logout", authentificate, ctrlWrapper(ctrl.logout))

module.exports = router