// "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");

//Routes
// const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//DB CONNECT
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
// app.use("/", authRoutes);
app.use("/", userRoutes);

//If production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("projfrontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "projfrontend", "build", "index.html")
    );
  });
}

//PORTS
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`running at ${port}`);
});
