import { useLocation } from "react-router-dom";

export default function ResumePreview() {
  const { state: data } = useLocation();
  if (!data) return <p>No resume data</p>;

  const sectionTitle = "text-xl font-semibold border-b pb-1 mb-2 mt-6";
  const item = "mb-1";

  const downloadProtected = async () => {
    const res = await fetch(
      "https://resume-built7327.onrender.com/api/resume/download-protected",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Resume.pdf";
    a.click();

    alert(`PDF Password: ${data.personal.name}-${data.personal.dob}`);
  };

  const emailResume = async () => {
    await fetch("https://resume-built7327.onrender.com/api/resume/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Email sent successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white max-w-4xl mx-auto p-10 shadow">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase">
            {data.personal?.name}
          </h1>
          <p className="text-gray-600">
            {data.personal?.email} | {data.personal?.phone} |{" "}
            {data.personal?.city}
          </p>
        </div>

        {/* OBJECTIVE */}
        {data.objective && (
          <section>
            <h2 className={sectionTitle}>Career Objective</h2>
            <p>{data.objective}</p>
          </section>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <section>
            <h2 className={sectionTitle}>Education</h2>
            {data.education.map((e, i) => (
              <p key={i} className={item}>
                • <b>{e.degree}</b> — {e.college} ({e.year})
              </p>
            ))}
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className={sectionTitle}>Experience</h2>
            {data.experience.map((e, i) => (
              <p key={i} className={item}>
                • <b>{e.role}</b> — {e.company} ({e.years})
              </p>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section>
            <h2 className={sectionTitle}>Projects</h2>
            {data.projects.map((p, i) => (
              <div key={i} className="mb-2">
                <p>
                  <b>{p.title}</b>
                </p>
                <p className="text-sm text-gray-600">Tech: {p.tech}</p>
                <p>{p.desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className={sectionTitle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print
          </button>

          <button
            onClick={downloadProtected}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Encrypted PDF
          </button>

          <button
            onClick={emailResume}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Email Resume
          </button>
        </div>
      </div>
    </div>
  );
}
