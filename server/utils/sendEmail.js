const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_EMAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  //   console.log(
  //     process.env.SMPT_HOST,
  //     process.env.SMPT_PORT,
  //     process.env.SMPT_SERVICE,
  //     process.env.SMPT_MAIL,
  //     process.env.SMPT_PASSWORD
  //   );
  //   console.log(process.env.SMPT_PASSWORD);
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
