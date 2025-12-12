'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        category: formData.subject || 'General Inquiry',
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          subject: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            Have a question or want to get in touch? Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
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
                Email *
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
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white bg-[rgba(10,10,15,0.9)] transition-all [&>option]:bg-[#0a0a0f] [&>option]:text-white"
              >
                <option value="">Select a subject (optional)</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support Request">Support Request</option>
                <option value="Business Inquiry">Business Inquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={8}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300">
                Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                {errorMessage || 'Something went wrong. Please try again later or contact us directly.'}
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

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-400">
          <p>We typically respond within 24-48 hours.</p>
        </div>
      </div>
    </div>
  );
}


