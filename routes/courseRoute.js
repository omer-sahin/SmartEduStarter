const router = require("express").Router();
const courseController = require("../controllers/courseController");

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourse);
router.route("/:slug").get(courseController.getCourse)

module.exports = router;
