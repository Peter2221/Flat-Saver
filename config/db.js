const mongoose = require('mongoose');
const config = require('./default.json');

const mongoURI = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("[I] Database connected");
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;