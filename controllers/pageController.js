const nodemailer=require("nodemailer")

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.render("index", {
    pages: "index",
  });
};

exports.getAbout = (req, res) => {
  res.render("about", {
    pages: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.render("register", {
    pages: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.render("login", {
    pages: "login",
  });
};


exports.getContact = (req, res) => {
  res.render("contact", {
    pages: "contact",
  });
};



exports.sendEmail =async (req, res) => {
  const outputMessage=`
  <h1>Message Details </h1>
  <ul>
  <li> Name: ${req.body.name} </li>
  <li> Email:${req.body.email} </li>
  </ul>
  <h1> Message </h1>
  <p> ${req.body.message} </p>`;




  try{

  
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
   
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "sahinomer514@gmail.com", // Gmail
        pass: "cjhasbtupnlepiym", // Gmail password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <sahinomer514@gmail.com>', // sender address
      to: "omer.s4hin04@gmail.com", // list of receivers
      subject: "Smart EDU Contact Form ✔", // Subject line
     
      html:outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
    req.flash("success","Mail Başarılı bir şekilde gönderildi")

  res.status(200).redirect("/contact")
}catch ( err ){

  req.flash("error",` Mesajınız   iletilemedi lütfen tekrar deneyin  ` );
  res.status(200).redirect("/contact")

}

 
};