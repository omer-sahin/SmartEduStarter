const express=require("express");
const ejs=require("ejs")
const getRoutes=require("./routes/route")


const port=3000;
const localhost="127.0.0.1";

const app=express();
app.set("view engine","ejs")

app.use(express.static("public"))
app.use("/",getRoutes)


app.listen(port,localhost,()=>{

    console.log(`Port Aktif http://${localhost}:${port}`)

})   









