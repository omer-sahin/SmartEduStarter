
exports.getIndexPage=(req,res)=>{
    res.render("index",{
        pages:"index"
    })

}



exports.getAbout=(req,res)=>{
    res.render("about",{
        pages:"about"
    })

}
