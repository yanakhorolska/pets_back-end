const { Schema, model } = require('mongoose');
const { handleValidationErrors } = require("../helpers");

const Joi = require("joi")
  .extend(require('@joi/date'));

// const sex = ["male", "female"]
// const defaultSex = sex[0];

const { PETS_DEFAULT_AVATAR : defaultAvatarURL = "" }  = process.env

// const kindSchema = new Schema (
//   {
//     name: {
//       type: String, 
//       required: [true, "name is required"],
//     }
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );
  
// const breedSchema = new Schema(
//   {
//     name: { 
//       type: String, 
//       required: [true, "name is required"],
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "kind",
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

const petSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "name is required"],
    },
    // kind: {
    //   type: Schema.Types.ObjectId,
    //   ref: "petkind",
    //   required: true,
    // },
    // breed: {
    //    type: Schema.Types.ObjectId,
    //    ref: "petbreed",
    //    required: true,
    // },
    breed : {
        type: String,
        required : [true, "breed is required"]
    },
    // sex: {
    //     type: String,
    //     enum: sex,
    //     default: defaultSex,
    //   },
    birthday: Date,
    avatarURL: {
      type: String,
      default: defaultAvatarURL
    },
    imagesURL: [String],
    сomment: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

petSchema.post("save", handleValidationErrors)

const addSchema = Joi.object({
    nickname: Joi.string().min(2).max(16).required(),
    birthday: Joi.date().format('YYYY-MM-DD').utc(),
    // breed: Joi.object().keys({
    //     name : Joi.string().min(2).max(16).required(),
    //     }
    // ).required(),
    breed: Joi.string().min(2).max(16),
    comment: Joi.string().min(8).max(120),
    //sex: Joi.string().valueOf(...sex).default(defaultSex),
  }).required()

// const Kind = model("petkind", kindSchema);
// const Breed = model("petbreed", breedSchema)
const Pet = model("pet", petSchema);

const schemas = {addSchema}

const customMessage = {
  post: { messages: {'any.required': "missing required fields"} },
  put: { messages: {'any.required': "missing fields"} },
}

module.exports = {
    Pet,
    schemas,
    customMessage }