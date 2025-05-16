import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import '../styles/contact.css';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 relative bg-[#1a1a1a] min-h-screen" id="contact">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#001a11] to-[#1a1a1a] z-0"></div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-lines-overlay"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-[#00ff9d] font-mono tracking-[0.2em] mb-3">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono">
            Contact{' '}
            <span className="text-[#00ff9d] relative">
              Me
              <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
            </span>
          </h2>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent my-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            Let's discuss your project or opportunities to work together
          </p>
        </div>

        {/* Full-width Contact Form */}
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          <form
            onSubmit={handleSubmit}
            className="bg-[#2a2a2a] p-8 rounded-lg border border-[#00ff9d]/20 shadow-[0_0_30px_rgba(0,255,157,0.1)]"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Send a{' '}
              <span className="text-[#00ff9d] relative">
                Message
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-field">
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ffffff20] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ffffff20] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field mb-4">
              <label htmlFor="subject" className="block text-gray-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ffffff20] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div className="form-field mb-6">
              <label htmlFor="message" className="block text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#ffffff20] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white min-h-[180px]"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#00ff9d] text-gray-900 rounded-lg font-mono hover:bg-[#00cc7a] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div
                    data-testid="loading-spinner"
                    className="loading-spinner"
                  ></div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <SendIcon size={18} className="ml-2" />
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="mt-4 p-4 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-lg text-[#00ff9d] text-center animate-fade-in">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </div>
          </form>

          <p className="text-center text-gray-400 mt-6 italic">
            You can also find all my contact information in the footer below.
          </p>
        </div>
      </div>
    </section>
  );
}
