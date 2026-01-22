import { useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import "./App.css";

export interface GeneralInfoData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onSubmit: (data: GeneralInfoData) => void;
}

type Errors = {
  name: string;
  email: string;
  phone: string;
};

export default function GeneralInfo({ onSubmit }: Props) {
  const [editing, setEditing] = useState(true);
  const [info, setInfo] = useState<GeneralInfoData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({ name: "", email: "", phone: "" });

  function validateField(name: string, value: string): string {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Enter a valid email";
      case "phone":
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) ? "" : "Enter a valid 10-digit phone number";
      default:
        return "";
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll(): boolean {
    const newErrors: Errors = {
      name: validateField("name", info.name),
      email: validateField("email", info.email),
      phone: validateField("phone", info.phone),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== "");
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmit(info);
    setEditing(false);
  }

  return (
    <div className="section">
      <h2>General Information</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={info.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={info.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={info.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone ? "error-input" : ""}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h2>{info.name}</h2>
          <p>{info.email}</p>
          <p>{info.phone}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
