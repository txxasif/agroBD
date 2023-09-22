const mongoose = require("mongoose");
let isConnected = false;
const MONGODB_URL =
  "mongodb+srv://agrobd:Asif8377@agrobd.joapcha.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection opened!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to database");
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
