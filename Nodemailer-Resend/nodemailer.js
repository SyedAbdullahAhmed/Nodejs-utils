// open 2FA on your google account
// open link : https://myaccount.google.com/apppasswords
// create an app , and it will show an password 

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: '<your-mail>',
    pass: '<password>' // we just have to get this password
  }
});

const mailOptions = {
  from: '<your-mail>',
  to: '<mail-you-want-to-send-email>',
  subject: '<add-content>',
  text: '<add-content>',
  html: `<add-content>`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    // Handle error here, e.g., send an error email or log the error
  } else {
    console.log('Email sent: ' + info.response);
  }
});