import { useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import "./App.css";

export interface EducationData {
  college: string;
  study: string;
  year: string;
}

interface Props {
  onSubmit: (data: EducationData) => void;
}

export default function Education({ onSubmit }: Props) {
  const [editing, setEditing] = useState(true);
  const [edu, setEdu] = useState<EducationData>({
    college: "",
    study: "",
    year: "",
  });

  const [errors, setErrors] = useState<EducationData>({
    college: "",
    study: "",
    year: "",
  });

  function validateField(name: string, value: string): string {
    if (!value.trim()) {
      switch (name) {
        case "college":
          return "College is required";
        case "study":
          return "Title of study is required";
        case "year":
          return "Year is required";
        default:
          return "";
      }
    }
    return "";
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEdu((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll(): boolean {
    const newErrors: EducationData = {
      college: validateField("college", edu.college),
      study: validateField("study", edu.study),
      year: validateField("year", edu.year),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((err) => err !== "");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;

    onSubmit(edu);
    setEditing(false);
  }

  return (
    <div className="section">
      <h2>Education</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="college"
            placeholder="College/University"
            value={edu.college}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.college && <p className="error">{errors.college}</p>}

          <input
            type="text"
            name="study"
            placeholder="Title of Study"
            value={edu.study}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.study && <p className="error">{errors.study}</p>}

          <input
            type="text"
            name="year"
            placeholder="Year of Study"
            value={edu.year}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.year && <p className="error">{errors.year}</p>}

          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h3>{edu.college}</h3>
          <p>{edu.study}</p>
          <p>{edu.year}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
