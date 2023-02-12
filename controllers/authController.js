const User = require("../models/User");
const bcyrpt = require("bcrypt");
const Category=require("../models/Category")
const Course=require("../models/Course")

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).redirect("/login");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcyrpt.compare(password, user.password, (err, same) => {
        
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          
        });
      } else {
        res.status(201).redirect("/register");
      }
    }).clone();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage =async (req, res) => {
const user=await User.findOne({_id:req.session.userID}).populate("courses")
const categories= await Category.find()
const courses= await Course.find({user:req.session.userID}).sort("-createdAt")
  res.status(200).render("dashboard",{
    pages:"dashboard",
    user,
    categories,
    courses
  });
};
