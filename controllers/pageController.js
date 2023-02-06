
exports.getIndexPage=(req,res)=>{
    console.log(req.session.userID)
    res.render("index",{
        pages:"index"
    })

}



exports.getAbout=(req,res)=>{
    res.render("about",{
        pages:"about"
    })

}


exports.getRegisterPage=(req,res)=>{
    res.render("register",{
        pages:"register"
    })


}
exports.getLoginPage=(req,res)=>{
    res.render("login",{
        pages:"login"
    })

}
