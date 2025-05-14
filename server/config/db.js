const mongose = require("mongoose");

const connectDB = async () => {
  const conn = await mongose.connect(process.env.MONGO_URI, {});

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = connectDB;
