const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", require("express").static("storage"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://resume-builder-frontend.onrender.com", // deployed frontend
    ],
  })
);
