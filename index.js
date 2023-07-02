const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/user.route");
const projectRoute = require("./routes/project.route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user/", userRoute);
app.use("/project/", projectRoute);

app.get("/", (req, res) => {
  res.status(200).send("API is live !");
});

// Handle 404 for not found URL
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Handle Error thrown by API
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
