const mongoose = require("mongoose");

module.exports.initiateDBConnection = async () => {
  mongoose
    .connect(
      "mongodb+srv://ahmad:test123@cluster0.vbktc.mongodb.net/users?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to DB.");
    })
    .catch((err) => {
      console.log(err);
    });
};
