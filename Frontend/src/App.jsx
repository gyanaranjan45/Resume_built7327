import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResumeForm />} />
        <Route path="/preview" element={<ResumePreview />} />
      </Routes>
    </BrowserRouter>
  );
}
