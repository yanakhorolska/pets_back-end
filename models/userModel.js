const { Schema, model } = require("mongoose")
const { handleValidationErrors } = require("../helpers");

const Joi = require("joi");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    region: {
      type: String,
    }, 
    city: {
      type: String,
    },
    birthday:{
      type: Date
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
      required: true,
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
      type: String
    },
    friend: [ 
      {
      type: Schema.Types.ObjectId,
      ref:"user"
      }
    ]
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
        const token = jwt.sign(payload, SECRET_KEY);
        this.token = token;
        this.save();
        return token;
      },
    },
  }
);

userSchema.post("save", handleValidationErrors);

const userMessage = { messages: {'any.required': "missing fields"} };

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().alphanum().min(7).max(32).required(),
  confirmPassword: Joi.ref('password'),
  name: Joi.string().min(3).required().pattern(/[A-Za-z]+/),
  city: Joi.string().pattern(/[A-Za-z]+, [A-Za-z]+/),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
}).required()

const loginSchema = Joi.object({
    email: Joi.string().email({tlds: false}).required(),
    password: Joi.string().alphanum().min(7).max(32).required(),
}).required()

const updateSchema = Joi.object({
  name: Joi.string().min(1).pattern(/[A-Za-z]+/),
  email: Joi.string().email({ tlds: false }).min(1),
  birthday: Joi.date(),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
  city: Joi.string().pattern(/[A-Za-z]+, [A-Za-z]+/),
}).required()

// const schemas = { registerSchema, loginSchema, updateSchema }


const User = model("user", userSchema);

module.exports = { User, registerSchema,  loginSchema, updateSchema};
