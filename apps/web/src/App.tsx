import { useState } from "react";
import GeneralInfo from "./Generalinfo";
import type { GeneralInfoData } from "./Generalinfo";
import Education from "./Education";
import type { EducationData } from "./Education";
import Experience from "./Experience";
import type { ExperienceData } from "./Experience";
import CVPreview from "./CVpreview";
import "./App.css";

export default function App() {
  const [general, setGeneral] = useState<GeneralInfoData | null>(null);
  const [education, setEducation] = useState<EducationData | null>(null);
  const [experience, setExperience] = useState<ExperienceData | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="app">
      <h1>CV Application</h1>
      {submitted ? (
        <CVPreview
          general={general}
          education={education}
          experience={experience}
          onEdit={() => setSubmitted(false)}
        />
      ) : (
        <>
          <GeneralInfo onSubmit={setGeneral} />
          <Education onSubmit={setEducation} />
          <Experience onSubmit={setExperience} />
          <button onClick={() => setSubmitted(true)}>Submit CV</button>
        </>
      )}
    </div>
  );
}
