const auth = require("./auth");
const user = require("./user")
const notices = require("./notices");
const sponsors = require("./sponsors");
const pets = require("./pets")
const news = require("./news/news")

module.exports = { 
    auth, 
    user, 
    notices, 
    sponsors,
    pets,
    news,
};
