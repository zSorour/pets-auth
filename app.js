const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const { initiateDBConnection } = require("./db/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

// define a catch-all error handler middleware
app.use("/", (err, req, res, next) => {
  res.status(err.code || 500);
  const errorMessage = err.message || "Server error, please try again later.";
  res.json({ message: errorMessage });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
  initiateDBConnection();
});
