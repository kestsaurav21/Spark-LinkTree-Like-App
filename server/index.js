require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const shareRoutes = require("./routes/share.routes");
const authRoutes = require("./routes/auth.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

// test route
app.get("/test", (req, res) => {
  res.send("Running Spark Server");
});

// user routes
app.use("/user", userRoutes);
app.use("/share", shareRoutes);
app.use("/auth", authRoutes);
app.use("/analytics", analyticsRoutes);


const port = process.env.PORT || 8080;

//DB connection
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
