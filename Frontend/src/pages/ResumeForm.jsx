import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function ResumeForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      education: [{ degree: "", college: "", year: "" }],
      experience: [{ company: "", role: "", years: "" }],
      projects: [{ title: "", tech: "", desc: "" }],
      skills: [""],
    },
  });

  const edu = useFieldArray({ control, name: "education" });
  const exp = useFieldArray({ control, name: "experience" });
  const proj = useFieldArray({ control, name: "projects" });
  const skill = useFieldArray({ control, name: "skills" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.post("/resume/save", data); // ✅ NOW WORKS
      navigate("/preview", { state: data });
    } catch (err) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const input = "border p-2 w-full rounded";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white w-full max-w-3xl p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Resume Builder</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                {...register("personal.name")}
                placeholder="Full Name"
                className={input}
              />
              <input
                {...register("personal.email")}
                placeholder="Email"
                className={input}
              />
              <input
                {...register("personal.phone")}
                placeholder="Phone"
                className={input}
              />
              <input
                {...register("personal.city")}
                placeholder="City"
                className={input}
              />
              <input
                type="date"
                {...register("personal.dob")}
                className={input}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Career Objective</h2>
            <textarea {...register("objective")} className={input} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {edu.fields.map((f, i) => (
              <div key={f.id} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  {...register(`education.${i}.degree`)}
                  placeholder="Degree"
                  className={input}
                />
                <input
                  {...register(`education.${i}.college`)}
                  placeholder="College"
                  className={input}
                />
                <input
                  {...register(`education.${i}.year`)}
                  placeholder="Year"
                  className={input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => edu.append({})}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Add Education
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            {exp.fields.map((f, i) => (
              <div key={f.id} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  {...register(`experience.${i}.company`)}
                  placeholder="Company"
                  className={input}
                />
                <input
                  {...register(`experience.${i}.role`)}
                  placeholder="Role"
                  className={input}
                />
                <input
                  {...register(`experience.${i}.years`)}
                  placeholder="Years"
                  className={input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => exp.append({})}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Add Experience
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            {proj.fields.map((f, i) => (
              <div key={f.id} className="space-y-2 mb-2">
                <input
                  {...register(`projects.${i}.title`)}
                  placeholder="Project Title"
                  className={input}
                />
                <input
                  {...register(`projects.${i}.tech`)}
                  placeholder="Tech Used"
                  className={input}
                />
                <textarea
                  {...register(`projects.${i}.desc`)}
                  placeholder="Description"
                  className={input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => proj.append({})}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Add Project
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            {skill.fields.map((f, i) => (
              <input
                key={f.id}
                {...register(`skills.${i}`)}
                placeholder="Skill"
                className={`${input} mb-2`}
              />
            ))}
            <button
              type="button"
              onClick={() => skill.append("")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Add Skill
            </button>
          </section>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold"
          >
            {loading ? "Submitting..." : "Generate Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}
