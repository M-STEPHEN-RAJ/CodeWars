const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5175", credentials: true }));

const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/questions", questionRoutes);
app.use("/auth", authRoutes);

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      process.exit(1);
    }
  };

  connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
