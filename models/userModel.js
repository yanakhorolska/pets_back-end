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
    },
    password: {
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
    friends: [ 
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
  email: Joi.string().email({tlds: false}).required(),
  password: Joi.string().required(),  
}).required()

const loginSchema = Joi.object({
    email: Joi.string().email({tlds: false}).required(),
    password: Joi.string().required(),
}).required()

const schemas = {registerSchema, loginSchema}

const User = model("user", userSchema);

module.exports = { User };
