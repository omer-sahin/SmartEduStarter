const controller = require("../controllers/getController");
const router = require("express").Router();

router.route("/").get(controller.getIndexPage);
router.route("/about").get(controller.getAbout);

module.exports = router;
