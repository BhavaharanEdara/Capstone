const nodemailer = require('nodemailer');

const sendEmail = async(data, req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.email,
          pass: process.env.emailPass,
          
        },
      });
    const info = await transporter.sendMail({
        from:  '<admin@insurence.com>', 
        to: data.to, 
        subject: data.subject,
        text: data.text, 
        html: data.html,
      });
    
      
}

module.exports = sendEmail