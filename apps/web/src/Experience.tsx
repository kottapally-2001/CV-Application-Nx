import { useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import  "./App.css";

export interface ExperienceData {
  company: string;
  position: string;
  from: string;
  until: string;
}

interface Props {
  onSubmit: (data: ExperienceData) => void;
}

type Errors = {
  company: string;
  position: string;
  from: string;
  until: string;
};

export default function Experience({ onSubmit }: Props) {
  const [editing, setEditing] = useState(true);
  const [exp, setExp] = useState<ExperienceData>({
    company: "",
    position: "",
    from: "",
    until: "",
  });

  const [errors, setErrors] = useState<Errors>({
    company: "",
    position: "",
    from: "",
    until: "",
  });

  function validateField(name: string, value: string): string {
    if (!value.trim()) {
      switch (name) {
        case "company": return "Company is required";
        case "position": return "Position is required";
        case "from": return "Start date is required";
        case "until": return "End date is required";
        default: return "";
      }
    }
    return "";
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setExp((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll(): boolean {
    const newErrors: Errors = {
      company: validateField("company", exp.company),
      position: validateField("position", exp.position),
      from: validateField("from", exp.from),
      until: validateField("until", exp.until),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((err) => err !== "");
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) return;

    onSubmit(exp);
    setEditing(false);
  }

  return (
    <div className="section">
      <h2>Experience</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.company ? "error-input" : ""}
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </div>

          <div>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={exp.position}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.position ? "error-input" : ""}
            />
            {errors.position && <span className="error">{errors.position}</span>}
          </div>

          <div>
            <input
              type="text"
              name="from"
              placeholder="From"
              value={exp.from}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.from ? "error-input" : ""}
            />
            {errors.from && <span className="error">{errors.from}</span>}
          </div>

          <div>
            <input
              type="text"
              name="until"
              placeholder="Until"
              value={exp.until}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.until ? "error-input" : ""}
            />
            {errors.until && <span className="error">{errors.until}</span>}
          </div>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h3>{exp.company}</h3>
          <p>{exp.position}</p>
          <p>{exp.from} - {exp.until}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
