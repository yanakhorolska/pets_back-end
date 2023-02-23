const { Schema, model } = require('mongoose');
const { handleValidationErrors } = require("../helpers");

const Joi = require("joi")
  .extend(require('@joi/date'));

const { PETS_DEFAULT_AVATAR : defaultAvatarURL = "" }  = process.env

const petSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "name is required"],
    },
    breed : {
        type: String,
        required : [true, "breed is required"]
    },
    birthday: Date,
    avatarURL: {
      type: String,
      default: defaultAvatarURL
    },
    imagesURL: [String],
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
    toJSON: {virtuals: true}
  }
);

petSchema.post("save", handleValidationErrors)

const addSchema = Joi.object({
  nickname: Joi.string().min(2).max(16).required(),
  birthday: Joi.date().format('YYYY-MM-DD').utc(), 
  breed: Joi.string().min(2).max(16).required(),
  comment: Joi.string().min(8).max(120),
}).required()

const updateSchema = Joi.object({
  nickname: Joi.string().min(2).max(16),
  birthday: Joi.date().format('YYYY-MM-DD').utc(),
  breed: Joi.string().min(2).max(16),
  comment: Joi.string().min(8).max(120),
}).required().min(1)

const Pet = model("pet", petSchema);

const schemas = { addSchema, updateSchema}

const customMessage = {
  post: { messages: {'any.required': "missing required fields"} },
  patch: { messages: {'object.min': "missing fields"} },
}

module.exports = {
    Pet,
    schemas,
    customMessage }