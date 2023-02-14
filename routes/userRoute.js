const router=require("express").Router();
const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authmiddleware");
const User=require("../models/User");

const { body } = require('express-validator');


router.route("/signup").post(
    [
        body("name").not().isEmpty().withMessage("Lütfen Adınızı Giriniz ..."),




        body("email").isEmail().withMessage("Lütfen bir email girin ...")
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user=>{
                if(user){
                    return Promise.reject("Girilen Email mevcut ")
                }
            })
        }),





        body("password").not().isEmpty().withMessage("Lütfen şifre Belirleyiniz ..."),
        body('password').isLength({ min: 8 }).withMessage(`Karakter sayısı en az 8 karakterden oluşmalı    `),
        
       
    ], authController.createUser);
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage)






module.exports=router