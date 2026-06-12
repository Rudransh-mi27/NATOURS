const nodemailer = require('nodemailer');

const sendEmail = async (Options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. define email options
  const mailOptions = {
    from: 'Rudransh Mishra <RD@mishra.io>',
    to: Options.email,
    subject: Options.subject,
    text: Options.message,
  };
  //3 actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
