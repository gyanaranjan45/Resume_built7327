const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    data: Object, // stores full resume JSON
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", ResumeSchema);
