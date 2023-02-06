const router = require("express").Router();
const pageController = require("../controllers/pageController");

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAbout);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);

module.exports = router;
