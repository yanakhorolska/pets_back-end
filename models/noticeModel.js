const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require('@joi/date'));
const { handleValidationErrors } = require("../helpers");

const NOTICE_CATEGORY = ["lostFound", "inGoodHands", "sell"];
const SEX = ["male", "female"];

const notice = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for pet is required"],
    },
    category: {
      type: String,
      enum: NOTICE_CATEGORY,
      default: NOTICE_CATEGORY[0],
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

const favoriteNoticeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    notice: { type: Schema.Types.ObjectId, ref: "notice" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Notice = model("notice", notice);
notice.post("save", handleValidationErrors);

const FavoriteNotice = model("favoritenotice", favoriteNoticeSchema);

const addNoticeSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  petName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().format('DD.MM.YYYY').utc().required(),
  breed: Joi.string().required(),
  sex: Joi.string().valid(...SEX).default(SEX[0]),
  location: Joi.string().required(),
  price: Joi.number().min(0).max(100000),
  comment: Joi.string().max(200).allow(null),
}).required();

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  Notice,
  FavoriteNotice,
  addNoticeSchema,
};
