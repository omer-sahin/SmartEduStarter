const router = require("express").Router();
const courseController = require("../controllers/courseController");
const roleMiddleware=require("../middlewares/roleMiddleware")

router.route("/").post(roleMiddleware(["teacher","admin"]),courseController.createCourse);
router.route("/").get(courseController.getAllCourse);
router.route("/:slug").get(courseController.getCourse)
router.route("/:slug").delete(courseController.deletelCourse)
router.route("/:slug").put(courseController.updateCourse)
router.route("/enroll").post(courseController.enrollCourse)
router.route("/release").post(courseController.releaselCourse)


module.exports = router;
