const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;