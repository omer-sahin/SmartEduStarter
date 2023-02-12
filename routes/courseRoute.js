const router = require("express").Router();
const courseController = require("../controllers/courseController");
const roleMiddleware=require("../middlewares/roleMiddleware")

router.route("/").post(roleMiddleware(["teacher","admin"]),courseController.createCourse);
router.route("/").get(courseController.getAllCourse);
router.route("/:slug").get(courseController.getCourse)

module.exports = router;
