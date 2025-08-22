'use client';

import React, { useState } from 'react';

const testimonialsData = [
  {
    quote: "I've been waiting for an app like this—where faith and service come first. SoulDeeds isn't just another dating app, it's a movement.",
    name: "Sara",
    age: 28,
    role: "Beta Tester",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop",
  },
  {
    quote: "Finally, a platform where I can meet someone who shares my love for community and purpose. It feels genuine.",
    name: "Ahmed",
    age: 31,
    role: "Beta Tester",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=256&h=256&fit=crop",
  },
  // {
  //   quote: "The guided conversations feature made me feel so much more comfortable. It's a respectful and meaningful way to get to know someone.",
  //   name: "Layla",
  //   age: 25,
  //   role: "Waitlist Member",
  //   avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop",
  // },
];

const Arrow = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'} bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-300 z-20`}
    aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
  >
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}></path>
    </svg>
  </button>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonialsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonialsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-20 lg:py-32 bg-gradient-radial from-white to-[#fdf5fd] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Success Stories
          </h2>
          <div className="w-20 h-1 bg-[#87127C] mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Arrow direction="left" onClick={goToPrevious} />

          <div className="relative w-full min-h-[320px] flex items-center justify-center">
            <div className="relative w-11/12 sm:w-9/12 md:w-8/12">
              {/* Purple background shape */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[20rem] h-[16rem] bg-[#87127C] z-0 sm:left-1/3 sm:-translate-x-0 sm:w-[32rem] sm:h-[25rem]"
                style={{ borderRadius: '50% 50% 45% 55% / 60% 40% 60% 40%' }}
              ></div>
              
              {/* Stacked cards effect - Fixed to show on both sides */}
              <div className="absolute w-full h-full bg-white rounded-3xl transform -translate-x-4 opacity-60 z-1"></div>
              <div className="absolute w-full h-full bg-white rounded-3xl transform -translate-x-2 opacity-70 z-2"></div>
              <div className="absolute w-full h-full bg-white rounded-3xl transform translate-x-0 opacity-80 z-3"></div>
              <div className="absolute w-full h-full bg-white rounded-3xl transform translate-x-2 opacity-70 z-2"></div>
              <div className="absolute w-full h-full bg-white rounded-3xl transform translate-x-4 opacity-60 z-1"></div>
              
              {/* Main Testimonial Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 pt-16 text-center z-10">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="absolute left-1/2 -translate-x-1/2 -top-12 w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}, {currentTestimonial.age}</h3>
                <p className="text-sm text-gray-500 mb-4">{currentTestimonial.role}</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  "{currentTestimonial.quote}"
                </p>
              </div>
            </div>
          </div>
          
          <Arrow direction="right" onClick={goToNext} />
        </div>
        
        <div className="flex justify-center items-center space-x-3 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#87127C] scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
