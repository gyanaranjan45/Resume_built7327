const nodemailer = require("nodemailer");

exports.sendEmail = async (to, password, filePath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Password Protected Resume",
    text: `Resume Password: ${password}`,
    attachments: [{ path: filePath }],
  });
};
