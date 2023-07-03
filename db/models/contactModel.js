const { Schema, model } = require('mongoose')

const contactsSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
};