// FAQ Component
import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "Can users choose specific time slots for meetings?",
      answer: "Yes, users can select preferred time slots through an intuitive interface, provided those slots align with the mentor's availability.",
    },
    {
      question: "Who can use this platform?",
      answer: "The platform is designed for students, early-career professionals, and anyone seeking guidance in career development or skill enhancement. Mentors can be industry leaders or subject matter experts.",
    },
    {
      question: "How can mentors register on the platform?",
      answer: "Mentors can sign up through a simple registration process, providing their expertise, availability, and professional background.",
    },
    {
      question: "Can mentors control their availability?",
      answer: "Yes, mentors can update their calendars to set available time slots and block off unavailable times.",
    },
    {
      question: "How is data security ensured during video calls and chats?",
      answer: "The platform implements encryption and other security measures to ensure that all communications remain private and secure.",
    },
    {
      question: "How can mentees find the right mentor?",
      answer: "Mentees can search for mentors based on specific industries, skillsets, or topics and book sessions accordingly.",
    },
    {
      question: "Is there a fee for mentees to use the platform?",
      answer: "This depends on the platform's monetization strategy. It may include free access, subscription plans, or pay-per-session models.",
    },
    {
      question: "Can mentees reschedule or cancel appointments?",
      answer: "Yes, the platform allows rescheduling or cancellation of appointments, subject to certain policies (e.g., a minimum notice period).",
    },
    {
      question: "Can mentors and mentees provide feedback after sessions?",
      answer: "Yes, the platform includes a feedback mechanism to improve the quality of mentoring and refine mentor-mentee matching.",
    },
    {
      question: "What makes this platform innovative compared to existing mentoring solutions?",
      answer: "The platform leverages advanced technology like automated scheduling, embedded communication tools, and intelligent matching algorithms while encouraging out-of-the-box features for niche or generic needs.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto m-6 p-6 bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              activeIndex === index ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-300'
            } hover:shadow-md hover:border-blue-300`}
          >
            <div className="text-lg font-semibold text-gray-700 flex justify-between items-center">
              {faq.question}
              <span
                className={`ml-4 text-xl transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <div className="mt-3 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

// Tailwind CSS styles applied directly in JSX. No separate CSS file needed.
