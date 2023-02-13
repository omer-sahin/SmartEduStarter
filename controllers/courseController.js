const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name:req.body.name,
      description:req.body.description,
      category:req.body.category,
      user:req.session.userID

    });

    res.status(201).redirect("/courses");
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
    const query=req.query.search;
    const category= await Category.findOne({slug:categorySlug}) //! js-egitim-serisi

    let filter={};
    if(categorySlug){
      filter={category:category._id}
    }

    if(query){
      filter={name:query}
    }
    if(!query && !categorySlug){
      filter.name="";
      filter.category=null;
    }

    const course = await Course.find({
      $or: [
        {
          name: { $regex: ".*" + filter.name + ".*", $options: "i" },
        },
        {
          category:filter.category
        }
      ],
    }).sort("-createdAt").populate("user")

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
    const user= await User.findById(req.session.userID)
    const course = await Course.findOne({slug: req.params.slug}).populate("user")
    res.status(200).render("course", {
      course,
      pages: "courses",
      user
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};
exports.enrollCourse = async  (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};



exports.releaselCourse = async  (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};


