const router=require("express").Router();
const authController=require("../controllers/authController");




router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authController.getDashboardPage)






module.exports=router