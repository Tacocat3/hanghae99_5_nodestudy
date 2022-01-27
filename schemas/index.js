const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/test", {ignoreUndefined: true}).catch((err) => {console.error(err);});
};

module.exports = connect;