const router=require("express").Router();
const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authmiddleware");




router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage)






module.exports=router