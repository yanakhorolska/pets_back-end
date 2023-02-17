const auth = require("./auth");
const user = require("./user")
const notices = require("./notices");
const services = require("./services");
const pets = require("./pets")
const news = require("./news/news")

module.exports = { 
    auth, 
    user, 
    notices, 
    services,
    pets,
    news,
 };
