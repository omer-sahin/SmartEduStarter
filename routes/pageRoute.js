const router = require("express").Router();
const pageController = require("../controllers/pageController");
const redirectMiddleware=require("../middlewares/redirectMiddleware")

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAbout);
router.route("/register").get(redirectMiddleware,pageController.getRegisterPage);
router.route("/login").get(redirectMiddleware,pageController.getLoginPage);
router.route("/contact").get(pageController.getContact)
router.route("/contact").post(pageController.sendEmail)
module.exports = router;
