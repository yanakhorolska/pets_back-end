const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(ctrl.register));
// authRouter.post("/login", login)
// authRouter.post("/logout", auth, logout)

module.exports = {
  authRouter,
};
