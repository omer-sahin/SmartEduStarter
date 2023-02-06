const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "succes",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const categorySlug=req.query.categories; //! courses?categories=js-egitim-serisi
    const category= await Category.findOne({slug:categorySlug}) //! js-egitim-serisi

    let filter={};
    if(categorySlug){
      filter={category:category._id}
    }


    const course = await Course.find(filter);

    const categories= await Category.find();

    res.status(200).render("courses", {
      course,
      categories,
      pages: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.getCourse = async  (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug});
    res.status(200).render("course", {
      course,
      pages: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

