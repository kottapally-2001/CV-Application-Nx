import type { GeneralInfoData } from "./Generalinfo";
import type { EducationData } from "./Education";
import type { ExperienceData } from "./Experience";

type Props = {
  general: GeneralInfoData | null;
  education: EducationData | null;
  experience: ExperienceData | null;
  onEdit: () => void;
};

export default function CVPreview({ general, education, experience, onEdit }: Props) {
  return (
    <div className="cv-preview">
      <h2>Preview</h2>

      {general && (
        <>
          <h3>General Information</h3>
          <p><strong>{general.name}</strong></p>
          <p>{general.email}</p>
          <p>{general.phone}</p>
        </>
      )}

      {education && (
        <>
          <h3>Education</h3>
          <p>{education.college} — {education.study} ({education.year})</p>
        </>
      )}

      {experience && (
        <>
          <h3>Experience</h3>
          <p>{experience.company} — {experience.position}</p>
          <p>{experience.from} - {experience.until}</p>
        </>
      )}

      <button onClick={onEdit}>Home</button>
    </div>
  );
}
