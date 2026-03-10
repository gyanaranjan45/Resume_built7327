const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts } = require("pdf-lib");

exports.generateProtectedPDF = async (resume, password) => {
  const dir = path.join(__dirname, "../storage");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const outputPath = path.join(dir, "Resume.pdf");

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;
  const write = (t) => {
    page.drawText(t, { x: 50, y, size: 12, font });
    y -= 18;
  };

  write("RESUME");
  y -= 10;
  write(`Name: ${resume.personal?.name}`);
  write(`Email: ${resume.personal?.email}`);
  write(`Phone: ${resume.personal?.phone}`);
  write(`City: ${resume.personal?.city}`);
  y -= 10;

  if (resume.objective) {
    write("Objective:");
    write(resume.objective);
    y -= 10;
  }

  if (resume.education?.length) {
    write("Education:");
    resume.education.forEach((e) =>
      write(`• ${e.degree} — ${e.college} (${e.year})`),
    );
    y -= 10;
  }

  if (resume.experience?.length) {
    write("Experience:");
    resume.experience.forEach((e) =>
      write(`• ${e.role} — ${e.company} (${e.years})`),
    );
    y -= 10;
  }

  if (resume.projects?.length) {
    write("Projects:");
    resume.projects.forEach((p) => {
      write(`• ${p.title}`);
      write(`  Tech: ${p.tech}`);
      write(`  ${p.desc}`);
    });
    y -= 10;
  }

  if (resume.skills?.length) {
    write("Skills:");
    write(resume.skills.join(", "));
  }

  pdfDoc.encrypt({
    userPassword: password,
    ownerPassword: password,
    permissions: {
      printing: "highResolution",
      modifying: false,
      copying: false,
    },
  });

  const bytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, bytes);

  return outputPath;
};
