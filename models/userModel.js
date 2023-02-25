const { Schema, model } = require("mongoose");
const { handleValidationErrors } = require("../helpers");

const Joi = require("joi");

const { USER_DEFAULT_AVATAR: defaultAvatarURL = "" } = process.env;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
      default: defaultAvatarURL,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    methods: {
      setPassword(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      },
      isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      getToken() {
        const payload = { id: this._id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
        this.token = token;
        this.save();
        return token;
      },
    },
  }
);

userSchema.post("save", handleValidationErrors);

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().pattern(/^\S+$/).min(7).max(32).required(),
  confirmPassword: Joi.ref("password"),
  name: Joi.string()
    .min(3)
    .pattern(/[A-Za-zА-Яа-я]+/)
    .required(),
  city: Joi.string().pattern(/[A-Za-zА-Яа-я]+, [A-Za-zА-Яа-я]+/),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
}).required();

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().pattern(/^\S+$/).min(7).max(32).required(),
}).required();

const updateSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .pattern(/[A-Za-zА-Яа-я]+/),
  email: Joi.string().email({ tlds: false }).min(1),
  birthday: Joi.date(),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
  city: Joi.string().pattern(/[A-Za-zА-Яа-я]+, [A-Za-zА-Яа-я]+/),
}).min(1);

const schemas = { registerSchema, loginSchema, updateSchema };

const customMessage = {
  post: { messages: { "any.required": "missing required fields" } },
  patch: { messages: { "object.min": "missing fields" } },
};

const User = model("user", userSchema);

module.exports = { User, schemas, customMessage };
