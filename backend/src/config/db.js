<<<<<<< HEAD
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB Error: ' + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB Error: ' + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
