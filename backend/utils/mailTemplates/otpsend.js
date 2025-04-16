exports.otpSendTemplate = (otp) => {
    return `
    <!DOCTYPE html>
   <html lang="en">
    <head>
    <style>
    *{
       margin:0; 
     }
    .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
    }
    .container img {
        display: block;
        margin: 0 auto;
        max-width: 100px;
    }
    .userPara{
        text-align:center;
        margin:15px 0 10px;
    }
    .container h2 {
        text-align: center;
        color: #333;
    }
    .container p {
        // line-height: 1.6;
        // margin: 10px; 
        color: #555;
    }
    .otp {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        background-color: #e0e0e0;
        padding: 10px;
        border-radius: 5px;
        margin: 20px 0;
    }
    </style>
  
    </head>
    <body>
      <div class="container">
          <img src="eSite_logo.png" alt="logo" />
          <h2>OTP Verification Mail</h2>
          <p class="userPara">Dear User,</p>
       
          <p>Thank you for registering with Studynotion, to complete your registation ,Please use the following otp(One Time Password) to verify your account:</p>
          
          <div class="otp">${otp}</div>
          <p>This otp is valid for five minutes.If you did not request this varification Please ignore this mail.</p>
          <p>Once your account verifed you will have access to our platform and its features</p>
      </div>
    </body>
   </html>
    `
}