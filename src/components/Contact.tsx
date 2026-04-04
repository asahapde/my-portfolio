import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const Contact = () => {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "asahapde@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="reveal py-20 pb-32"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs font-mono mb-1"
            style={{ color: "var(--text-subtle)" }}
          >
            04
          </p>
          <h2 id="contact-heading" className="text-2xl font-semibold lowercase">
            contact
          </h2>
          <div className="divider mt-4" />
        </div>

        {/* Intro */}
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Open to new opportunities and interesting engineering problems. Reach
          out directly or use the form below.
        </p>

        {/* Contact links */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <a
            href="mailto:asahapde@gmail.com"
            className="link-underline"
          >
            asahapde@gmail.com
          </a>
          <a
            href="https://github.com/asahapde"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            github.com/asahapde
          </a>
          <a
            href="https://www.linkedin.com/in/abdullah-sahapdeen/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            linkedin.com/in/abdullah-sahapdeen
          </a>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="form-input"
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="form-input"
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              required
              rows={5}
              className="form-input"
              style={{ resize: "vertical" }}
              aria-required="true"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeOpacity="0.25"
                    />
                    <path
                      fill="currentColor"
                      fillOpacity="0.75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </button>

            {/* Status messages */}
            {submitStatus === "success" && (
              <p className="text-sm" style={{ color: "var(--accent)" }}>
                Message sent. I'll be in touch soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-sm" style={{ color: "#ef4444" }}>
                Something went wrong. Email me directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
