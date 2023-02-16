const { User } = require('../../models/userModel');

const current = async (req, res) => {
    const {name, birthday, city, email, friend} = req.user;
    res.json({status: "sucsses", data: {name, birthday, email, city, friend}})
}

module.exports = current