'use client';

import { useState } from 'react';
import FAQItem from '@/components/FAQItem';
import { sendContactEmail } from '@/lib/api';

const faqs = [
  {
    question: "How do I download an app?",
    answer: "Simply click on the App Store or Google Play badge on any app card. This will take you directly to the app's page in the respective store where you can download it."
  },
  {
    question: "Are the apps free?",
    answer: "Pricing varies by app. Please check the individual app pages in the App Store or Google Play Store for current pricing information."
  },
  {
    question: "Do you offer support for your apps?",
    answer: "Yes! We provide support for all our apps. You can reach out to us through this support page, and we'll respond as quickly as possible."
  },
  {
    question: "How do I report a bug?",
    answer: "Use the contact form below and select 'Bug report' as the category. Please include as much detail as possible about the issue, including your device model and app version."
  },
  {
    question: "Can I request a new feature?",
    answer: "Absolutely! We love hearing from our users. Use the contact form below and select 'Feature request' as the category. We review all suggestions and consider them for future updates."
  },
  {
    question: "Are my data and privacy protected?",
    answer: "Yes, we take privacy and security very seriously. All our apps follow strict privacy guidelines and use industry-standard security practices. Please review our Privacy Policy for detailed information."
  }
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'Bug report',
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        category: formData.category,
        fileName: formData.file?.name,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          category: 'Bug report',
          file: null
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Support
          </h1>
          <p className="text-xl text-gray-300">
            We're here to help. Find answers or reach out to us.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
            
            {/* Contact Information */}
            <div className="mb-8 p-6 rounded-lg glass border border-white/20">
              <p className="text-sm font-semibold text-gray-300 mb-4">You can reach us at:</p>
              <div className="text-gray-300 space-y-3">
                <div>
                  <p className="font-semibold text-white text-sm">Mailing Address:</p>
                  <p className="text-sm ml-4">
                    PO Box 52,<br />
                    Detroit, ME 04929
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Phone:</p>
                  <p className="text-sm">207-947-1999</p>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Email:</p>
                  <p className="text-sm">support@ultimateapps.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white bg-transparent transition-all"
                >
                  <option value="Bug report">Bug Report</option>
                  <option value="Feature request">Feature Request</option>
                  <option value="Account help">Account Help</option>
                  <option value="General inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all resize-none"
                  placeholder="Please describe your issue or question..."
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                  Attach File (Optional)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-white hover:file:bg-purple-500/30 transition-all"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                  Something went wrong. Please try again later or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

