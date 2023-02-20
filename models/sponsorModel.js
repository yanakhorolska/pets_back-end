const { Schema, model } = require("mongoose");

const sponsorShema = new Schema({
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

const Sponsor = model("sponsor", sponsorShema);

module.exports = {
  Sponsor,
};
