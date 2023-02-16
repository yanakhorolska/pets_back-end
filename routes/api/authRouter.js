const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { authentificate } = require("../../middlewares")

const router = express.Router();

router
  .post("/register", ctrlWrapper(ctrl.register))
  .post("/login", ctrlWrapper(ctrl.login))
  .post("/logout", authentificate, ctrlWrapper(ctrl.logout))

module.exports = router;