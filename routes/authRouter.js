const express = require("express");
// const {auth} = require("../middlewares/authMiddleware")
const { register, login, logout } = require("../controllers/authControllers");
const { ctrlWrapper } = require("../middlewares");

const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(register));
// authRouter.post("/login", login)
// authRouter.post("/logout", auth, logout)

module.exports = {
  authRouter,
};
