//! allow gmail to send mail https://myaccount.google.com/lesssecureapps?rapt=AEjHL4MXACfMyGlcUJJdBkDXvlJPfEFcjmSoiJEnYoDUBUkUE_bjawUKQLoNMtZYSWMkJSNYiprB7AIKY-Hb1hkEdW2s_5cKWA
const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: 'Buddha123!@#',
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
