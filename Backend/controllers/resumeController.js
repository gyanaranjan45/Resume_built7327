const Resume = require("../models/Resume");
const genPass = require("../utils/passwordgenerator");
const pdf = require("./pdfController");
const emailer = require("./emailController");

// ✅ SAVE RESUME (FIXES SUBMISSION FAILED)
exports.saveResume = async (req, res) => {
  await Resume.create({ data: req.body });
  res.json({ message: "Saved" });
};

// 🔐 DOWNLOAD ENCRYPTED PDF
exports.downloadProtected = async (req, res) => {
  const data = req.body;
  const password = genPass(data.personal.name, data.personal.dob);

  const filePath = await pdf.generateProtectedPDF(data, password);

  res.download(filePath, "Resume.pdf");
};

// 📧 EMAIL RESUME
exports.emailResume = async (req, res) => {
  const data = req.body;
  const password = genPass(data.personal.name, data.personal.dob);

  const filePath = await pdf.generateProtectedPDF(data, password);

  await emailer.sendEmail(data.personal.email, password, filePath);

  res.json({ message: "Email sent" });
};
