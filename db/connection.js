const mongoose = require('mongoose')

const { MONGO_URL } = process.env

const mongoConnect = async () => {
  await  mongoose.connect(MONGO_URL)
}

module.exports = {
  mongoConnect,
};