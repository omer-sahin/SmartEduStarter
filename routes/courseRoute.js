const router = require("express").Router();
const courseController=require("../controllers/courseController")

router.route("/").post(courseController.createCourse);


module.exports = router;
