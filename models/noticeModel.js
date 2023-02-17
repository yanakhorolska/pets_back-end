const { Schema, model } = require("mongoose");
const Joi = require("joi");

const NOTICE_TYPES = ["lostFound", "inGoodHands", "sell"];
const SEX = ["male", "female"];

const notice = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for pet is required"],
    },
    type: {
      type: String,
      enum: NOTICE_TYPES,
      default: NOTICE_TYPES[0],
      required: [true, "Type for notice is required"],
    },
    petName: {
      type: String,
      minLength: 2,
      required: [true, "Name for pet is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Daye of birth for pet is required"],
    },
    breed: {
      type: String,
      default: null,
    },
    sex: {
      type: String,
      enum: SEX,
      default: SEX[0],
    },
    location: {
      type: String,
      required: [true, "Location for notice is required"],
    },
    price: {
      type: Number,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
  },
  {
    virtuals: {
      age: {
        get() {
          return calculateAge(this.dateOfBirth);
        },
      },
    },
  }
);

const Notice = model("notice", notice);

const addNoticeSchema = Joi.object({
  title: Joi.string().min(2).required(),
  type: Joi.string().required(),
  petName: Joi.string().min(2).required(),
  dateOfBirth: Joi.date().required(),
  breed: Joi.string().required(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required(),
  price: Joi.number(),
  imageUrl: Joi.string(),
  comment: Joi.string(),
  favorite: Joi.boolean(),
}).required();

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  Notice,
  addNoticeSchema,
};
