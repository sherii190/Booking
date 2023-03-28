const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  const configuration = {
    autoIndex: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  const db = config.get("db");
  console.log("db >>>>>>", db);
  mongoose
    .connect(db, configuration)
    .then(() => {
      winston.info(`Connected to ${db}...`)
      console.log(`Connected to ${db}...`)
    })
    .catch((err) => winston.info(`major Error: ${err}`));
};
