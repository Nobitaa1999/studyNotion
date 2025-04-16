const nodemailer=require('nodemailer');
const {otpSendTemplate}=require("./mailTemplates/otpsend")
require('dotenv').config();

exports.mailSender=async(email,title,body)=>{
    
    try {
       
        const transporter = nodemailer.createTransport({ 
            host: process.env.MAIL_HOST,
            // service: 'gmail',
            
            auth: {
              user: process.env.MAIL_USER,
              pass:process.env.MAIL_PASSWORD ,
            },
        })

        await transporter.verify((error, success) => {
            if (error) {
                console.error("Transporter verification failed:", error);
            } else {
                console.log("Server is ready to send emails:", success);
            }
        });
        
        
        const info = await transporter.sendMail({
            
            from: "StudyNotion || Ankur singh", 
            to: `${email}`, 
            subject: `${title}`,
            html: `${body}`
          });
       
          console.log("info :",info);
          return info;
    } catch (error) {
        console.log(error.message);        
    }
}

// module.exports=mailSender;