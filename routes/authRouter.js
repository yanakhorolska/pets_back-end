const express = require("express")
// const {auth} = require("../middlewares/authMiddleware")
const { register, login, logout } = require("../controllers/authControllers")
const { tryCatchWrapper } = require("../helpers/trycatchWrapper")

const authRouter = express.Router()

authRouter.post("/register", tryCatchWrapper(register) )
// authRouter.post("/login", login)
// authRouter.post("/logout", auth, logout)

module.exports = {
    authRouter
}
