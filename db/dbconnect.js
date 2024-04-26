const mongoose = require("mongoose");

module.exports = (url) => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to the DB");
  }).catch((err) => {
    console.log(err);
  });
};
