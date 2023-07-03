const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt");
const Joi=require('joi')

const usersSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false }
);

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password:Joi.string().required()
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

usersSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", usersSchema);

module.exports = {
  User,
  schemas,
};