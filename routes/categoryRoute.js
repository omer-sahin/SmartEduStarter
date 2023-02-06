const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.route("/").post(categoryController.createCategory);


module.exports = router;
