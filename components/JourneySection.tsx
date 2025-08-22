import React from 'react';
import Image from 'next/image';

const journeyData = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Focus On Values, Lifestyle, And Goals Instead Of Just Photos',
    imageUrl: '/images/journey-1.png',
  },
  {
    number: '02',
    title: 'Get Matched Through Our Values Algorithm',
    description: 'Connect With Singles Who Share Your Faith And Priorities',
    imageUrl: '/images/journey-2.png',
  },
  {
    number: '03',
    title: 'Join Community & Service Events',
    description: 'Virtual Or In-Person—Serve, Connect, And Bond Naturally',
    imageUrl: '/images/journey-3.png',
  },
  {
    number: '04',
    title: 'Start Guided Halal Conversations',
    description: 'Safe, Meaningful Conversations Designed For Serious Seekers',
    imageUrl: '/images/journey-4.png',
  },
];

const JourneySection: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 text-center pt-16 pb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Discover your <span className="text-[#87127C]">journey</span>
        </h2>
        <div className="w-20 h-1 bg-[#87127C] mx-auto mt-4"></div>
      </div>
      
      <div>
        {journeyData.map((step, index) => (
          <div key={step.number} className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
            <div className="container mx-auto px-6 py-8 md:py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                {/* Image Column */}
                <div className={index % 2 !== 0 ? 'md:order-last' : ''}>
                  <Image
                    src={step.imageUrl}
                    alt={step.title}
                    width={600}
                    height={600}
                    className="rounded-2xl w-full max-w-sm mx-auto object-cover aspect-square"
                  />
                </div>
                
                {/* Text Column */}
                <div className="text-center md:text-left">
                  <span className="text-5xl lg:text-6xl font-bold text-[#87127C]">{step.number}</span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-2 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">{step.description}</p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;
