const router = require("express").Router();
const pageController=require("../controllers/pageController")

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAbout);

module.exports = router;
