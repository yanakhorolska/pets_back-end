const { User } = require("../../models/userModel");

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

module.exports = register;
