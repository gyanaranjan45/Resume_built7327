const Resume = require("../models/Resume");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.getResumes = async (req, res) => {
  const resumes = await Resume.find().sort({ createdAt: -1 });
  res.json(resumes);
};

exports.updateResume = async (req, res) => {
  await Resume.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
};

exports.deleteResume = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
