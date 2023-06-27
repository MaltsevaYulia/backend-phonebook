const { Shema, model } = require('mongoose')

const contactsShema = Shema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const Contact = model("contact", contactsShema);

module.exports = {
  Contact,
};