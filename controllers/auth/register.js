const { User } = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");

// const JWT_SECRET = process.env;

async function register(req, res, next) {
  const { email, password, name } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    console.log(savedUser);
    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("Email in use");
    }
    throw error;
  }
}

module.exports = register;
