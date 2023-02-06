const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute=require("./routes/categoryRoute")

const port = 3000;
const localhost = "127.0.0.1";

const app = express();
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/smartEdu-db")
  .then(() => console.log("Connected!"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);


app.listen(port, localhost, () => {
  console.log(`Port Aktif http://${localhost}:${port}`);
});
