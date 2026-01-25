import { SendIcon } from 'lucide-react';
import { useState } from 'react';

import { useTranslations } from '../hooks/useTranslations';
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
  const t = useTranslations();

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#1a2533] to-[#1a1a1a] z-0"></div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-lines-overlay"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-[#00ff9d] text-sm uppercase mb-3 tracking-wider font-medium">
            {t.contact.getInTouch}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            {t.contact.title}{' '}
            <span className="text-[#00ff9d]">{t.contact.me}</span>
          </h2>
          <div className="h-0.5 w-16 mx-auto bg-[#00ff9d] my-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Full-width Contact Form */}
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl p-8 rounded-lg border border-white/10 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              {t.contact.sendMessage}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-field">
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  {t.contact.yourName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white placeholder:text-gray-500"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  {t.contact.emailAddress}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white placeholder:text-gray-500"
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
              </div>
            </div>

            <div className="form-field mb-4">
              <label htmlFor="subject" className="block text-gray-400 mb-2">
                {t.contact.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white placeholder:text-gray-500"
                placeholder={t.contact.subjectPlaceholder}
                required
              />
            </div>

            <div className="form-field mb-6">
              <label htmlFor="message" className="block text-gray-400 mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]/50 focus:border-transparent text-white min-h-[180px] placeholder:text-gray-500"
                placeholder={t.contact.messagePlaceholder}
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#00ff9d] text-gray-900 rounded-lg font-medium hover:bg-[#00cc7a] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div
                    data-testid="loading-spinner"
                    className="loading-spinner"
                    aria-label="Submitting form"
                  ></div>
                ) : (
                  <>
                    <span>{t.contact.sendButton}</span>
                    <SendIcon size={18} className="ml-2" />
                  </>
                )}
              </button>

              {submitSuccess && (
                <div
                  id="submit-success"
                  role="status"
                  aria-live="polite"
                  className="mt-4 p-4 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-lg text-[#00ff9d] text-center animate-fade-in"
                >
                  {t.contact.successMessage}
                </div>
              )}
            </div>
          </form>

          <p className="text-center text-gray-400 mt-6 italic">
            {t.contact.footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
