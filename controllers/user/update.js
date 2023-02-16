const { User } = require("../../models/userModel");

const update = async (req, res) => {
  const { _id: id } = req.user;

  const user = await User.findByIdAndUpdate(
    id,  { ...req.body },
    { new: true }
  );
  res.json({status: "sucsess", data: user})
};

module.exports = update;
