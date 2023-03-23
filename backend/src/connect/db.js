const mongoose = require("mongoose");

const connect = async () => {
  return mongoose.connect(process.env.DB_URI);
};

module.exports = connect;
