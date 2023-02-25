const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));
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
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
    breed: {
      type: String,
      default: "",
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
      default: 0,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: "",
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
    toObject: { virtuals: true },
  }
);

notice.virtual("age").get(function () {
  const birthday = this.dateOfBirth;

  if (!birthday) return null;

  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);

  return {
    days: ageDate.getUTCDate(),
    months: ageDate.getUTCMonth(),
    years: Math.abs(ageDate.getUTCFullYear() - 1970),
  };
});

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

notice.post("save", handleValidationErrors);

const Notice = model("notice", notice);
const FavoriteNotice = model("favoritenotice", favoriteNoticeSchema);

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid(...NOTICE_CATEGORY)
    .required(),
  title: Joi.string().min(2).max(100).required(),
  petName: Joi.string().min(2).max(50).allow(""),
  dateOfBirth: Joi.date().format("YYYY-MM-DD").utc().allow(""),
  breed: Joi.string().required().allow(""),
  sex: Joi.string()
    .valid(...SEX)
    .default(SEX[0]),
  location: Joi.string().required(),
  price: Joi.string().when("category", { is: "sell", then: Joi.required() }),
  comment: Joi.string().max(200).optional().allow(""),
  imageUrl: Joi.string().optional().allow(""),
}).required();

module.exports = {
  Notice,
  FavoriteNotice,
  addNoticeSchema,
};
