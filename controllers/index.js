const auth = require("./auth");
const user = require("./user")
const notices = require("./notices");
const services = require("./services");
const news = require("./news/news");

module.exports = { 
    auth, 
    user, 
    notices, 
    services, 
    news
};