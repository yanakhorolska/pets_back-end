const { Schema, model } = require("mongoose");

const friends = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  workDays: [{
    isOpen: Boolean,
    from: String,
    to: String
  }],
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const servicesModel = model("sponsors", friends);

module.exports = {
  servicesModel,
};
