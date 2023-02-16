const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { authentificate} = require("../../middlewares")

const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(ctrl.register));
authRouter.post("/login", ctrlWrapper(ctrl.login))
authRouter.post("/logout", authentificate, ctrlWrapper(ctrl.logout))

module.exports = {
  authRouter,
};
