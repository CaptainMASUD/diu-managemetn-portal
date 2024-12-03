import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
    // Here, you could send the form data to your server/API (using fetch, axios, etc.)
    console.log('Form data submitted:', formData);

    // Reset form data after submission (optional)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600">Contact Us</h2>

        {isSubmitted && (
          <div className="bg-green-100 text-green-700 p-4 mb-6 rounded shadow">
            Thank you for reaching out! We will get back to you soon.
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-6 rounded shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-lg font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter the subject"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
              placeholder="Your message here..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
