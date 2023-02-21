const { User } = require("../../models/userModel");
// const bcrypt = require("bcryptjs");
// const { Conflict } = require("http-errors");

async function register(req, res) {
  const { email, password, name, city, phone } = req.body;

  const savedUser = new User({
    email,
    name,
    city,
    phone,
  });

  savedUser.setPassword(password);
  await savedUser.save();
  
  res.status(201).json({
    user: {
      name,
      email,
      city,
      phone,
    },
  });
}

// async function register(req, res, next) {
//   const { email, password, name, city, phone} = req.body;

//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // User.setPassword(password)

//   try {
//     const savedUser = await User.create({
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword,
//       name,
//       city,
//       phone,
//     });
//     res.status(201).json({
//       user: {
//         name,
//         email,
//         city,
//         phone,
//       },
//     });
//   } catch (error) {
//     console.log(error.message);
//     if (error.message.includes("E11000 duplicate key error")) {
//       throw Conflict("Email in use");
//     }
//     throw error;
//   }
// }

module.exports = register;
