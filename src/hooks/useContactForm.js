import { useCallback, useEffect, useState } from "react";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Enter a valid email.";
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

// Encapsulates form state, client-side validation, and the Resend API call
// so Contact.js only has to deal with rendering.
export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState("");

  // Auto-dismiss the success/error toast after a few seconds.
  useEffect(() => {
    if (status !== "success" && status !== "error") return undefined;
    const timer = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const submit = useCallback(async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fill in all fields correctly.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const reason = typeof data.error === "string" ? data.error : data.error?.message;
        throw new Error(reason || `Failed to send message (error ${res.status}).`);
      }

      setStatus("success");
      setStatusMessage("Your message has been sent. I'll get back to you soon!");
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setStatusMessage(err.message || "Something went wrong. Please try again.");
    }
  }, [formData]);

  return { formData, errors, status, statusMessage, handleChange, submit };
}
