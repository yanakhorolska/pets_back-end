const { Schema, model } = require("mongoose");

const serviceShema = new Schema({
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

const Service = model("sponsor", serviceShema);

module.exports = {
  Service,
};
