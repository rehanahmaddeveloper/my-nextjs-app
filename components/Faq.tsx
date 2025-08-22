'use client';

import React, { useState } from 'react';

const faqData = [
  { 
    question: "Is SoulDeeds a dating app?",
    answer: "No. SoulDeeds is a Muslim matrimonial and community platform designed for serious, faith-aligned connections—without the casual dating culture."
  },
  { 
    question: "How do I know my profile is safe?",
    answer: "All profiles are verified and private, and guided conversations ensure a safe, halal environment."
  },
  { 
    question: "When will SoulDeeds launch?",
    answer: "We’re launching late-August 2025. Join the waitlist to be the first to access exclusive early invites!"
  },
  { 
    question: "Is this for all Muslims worldwide?",
    answer: "Yes! We are starting in the U.S., UK, Canada, and South Asia, with global expansion planned soon."
  },
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg mb-4 overflow-hidden">
      <button 
        className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-semibold text-gray-800">{item.question}</h3>
        <div className="bg-gray-100 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
          <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 pt-0 pb-5 text-gray-600 text-sm text-left">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};


const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 1438 664" preserveAspectRatio="none" fill="#87127C" xmlns="http://www.w3.org/2000/svg">
            <path d="M1361.35 638.76C1280.36 612.599 1194.8 586.51 1092.76 575.115C1008.11 565.667 918.052 566.979 829.892 568.479C760.535 569.677 690.553 570.953 623.524 577.812C535.716 586.807 456.821 604.911 376.03 620.771C295.245 636.589 208.263 650.568 117.343 650.047C77.164 649.818 36.0811 646.109 0 639.25V0H719.137H1438.27V663.99C1412.76 655.516 1387.13 647.12 1361.35 638.76Z" />
        </svg>
      </div>
      <div className="container mx-auto px-6 pt-20 pb-32 lg:pt-28 lg:pb-40 text-center text-white relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="w-20 h-1 bg-white mx-auto mt-6 mb-12"></div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
             <FaqItem 
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
