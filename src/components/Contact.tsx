import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Contact info card component
const ContactCard = ({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) => (
  <div className="group relative p-6 rounded-2xl backdrop-blur-glass border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover-lift hover-glow">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

    <div className="relative z-10 text-center">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {href ? (
        <a
          href={href}
          className="text-gray-300 hover:text-gradient transition-colors duration-300"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        <p className="text-gray-300">{content}</p>
      )}
    </div>
  </div>
);

// Form input component
const FormInput = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  isTextarea = false,
  rows = 6,
}: {
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}) => (
  <div className="group">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors duration-300"
    >
      {label} {required && <span className="text-blue-400">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full px-6 py-4 bg-white/5 backdrop-blur-glass border border-white/20 rounded-2xl text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 
          hover:border-white/30 transition-all duration-300 resize-none
          group-focus-within:bg-white/10"
        placeholder={placeholder}
        aria-required={required}
      />
    ) : (
      <input
        type={type || "text"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-6 py-4 bg-white/5 backdrop-blur-glass border border-white/20 rounded-2xl text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 
          hover:border-white/30 transition-all duration-300
          group-focus-within:bg-white/10"
        placeholder={placeholder}
        aria-required={required}
      />
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      content: "asahapde@gmail.com",
      href: "mailto:asahapde@gmail.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      title: "LinkedIn",
      content: "Connect with me",
      href: "https://www.linkedin.com/in/abdullah-sahapdeen/",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "GitHub",
      content: "View my work",
      href: "https://github.com/asahapde",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full animate-float" />
        <div
          className="absolute bottom-1/4 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-20 ${
            isVisible ? "animate-slide-in-up" : "opacity-0"
          }`}
        >
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities?{" "}
            <span className="text-gradient font-semibold">
              I'd love to hear from you.
            </span>
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {/* Contact Information */}
          <div
            className={`space-y-8 ${
              isVisible
                ? "animate-slide-in-left animate-delay-400"
                : "opacity-0"
            }`}
          >
            <div>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get in Touch
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I'm always excited to collaborate on new projects and discuss
                innovative ideas. Whether you have a specific project in mind or
                just want to chat about technology, feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  href={info.href}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {[
                { label: "Response Time", value: "< 24h" },
                { label: "Projects Completed", value: "10+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`${
              isVisible
                ? "animate-slide-in-right animate-delay-600"
                : "opacity-0"
            }`}
          >
            <div className="relative p-8 md:p-10 rounded-3xl backdrop-blur-glass border border-white/10 hover:border-blue-400/20 transition-all duration-500 overflow-hidden group">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Orb */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />

              <div className="relative z-10">
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      label="Name"
                      required
                    />
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      label="Email"
                      required
                    />
                  </div>

                  <FormInput
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello!"
                    label="Message"
                    required
                    isTextarea
                    rows={6}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold 
                      hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                      transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                      magnetic-button overflow-hidden"
                    aria-busy={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Send Message
                        </>
                      )}
                    </span>
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 animate-scale-in"
                      role="alert"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 animate-scale-in"
                      role="alert"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>
                        Failed to send message. Please try again or email me
                        directly.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-20 ${
            isVisible ? "animate-slide-in-up animate-delay-1000" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-glass border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300">
              Available for new opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
