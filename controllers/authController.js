const User = require("../models/User");
const bcyrpt = require("bcrypt");
const Category=require("../models/Category")
const Course=require("../models/Course")
const {  validationResult } = require('express-validator');
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/login");
  } catch (error) {



    const errors=validationResult(req)

    
   for (let i = 0; i < errors.array().length; i++) {
    req.flash("error",`${errors.array()[i].msg} `)
    
    
   }

   

    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcyrpt.compare(password, user.password, (err, same) => {
          
          if(same){

            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          }
          else{

            req.flash("error",`Hatalı Şifre girdiniz Lütfen tekrar deneyin `)
            res.status(200).redirect("/login");


          }
           
          
        });
      }  else {
      

          

          setTimeout(() => {
            req.flash("error",`Böyle bir kullanıcı bulunamadı`)
            
          }, 500);


          setTimeout(() => {
            res.status(201).redirect("/register");
            
          }, 3000);

         


        
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
