const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute=require("./routes/categoryRoute")
const userRoute=require("./routes/userRoute")
const session=require("express-session")
const MongoStore = require('connect-mongo');
const port = 3000;
const localhost = "127.0.0.1";

const app = express();



//! Connect MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/smartEdu-db")
  .then(() => console.log("Connected!"));
//! Template Engine 
app.set("view engine", "ejs");

app.use(express.static("public"));




global.userIN=null

//! Midleware



app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartEdu-db' })

 
}))

app.use("*",(req,res,next)=>{
  userIN=req.session.userID;
  next();

})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


app.listen(port, localhost, () => {
  console.log(`Port Aktif http://${localhost}:${port}`);
});
