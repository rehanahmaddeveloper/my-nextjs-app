import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onWaitlistClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onWaitlistClick }) => {
  return (
    // UPDATED: Reduced top padding to decrease the space above the hero content.
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFE9FD] pt-20 pb-20 lg:pt-28 lg:pb-24">
       <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left z-10">
            <h1 className="font-bold text-gray-800 leading-tight">
              <span className="block text-xl md:text-3xl font-bold text-[#87127C] mb-2">
                No more endless swiping.
              </span>
              <span className="text-[32px] leading-snug md:text-3xl">
                Find halal connections that last and connect through shared purpose.
              </span>
            </h1>
            <div className="mt-6 flex justify-center lg:justify-start">
                <div className="w-16 h-1 bg-[#87127C]"></div>
            </div>
            <p className="mt-6 text-[15px] text-gray-600 max-w-lg mx-auto lg:mx-0">
              SoulDeeds is the first Muslim matrimonial platform that combines faith, service, and meaningful connection, no swiping, no pressure, just genuine connections.
            </p>
            <div className="mt-10">
              <button
                onClick={onWaitlistClick}
                className="w-full md:w-auto bg-[#87127C] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#6c0e63] transition-all duration-300 transform hover:scale-105">
                Join the Waitlist Now
              </button>
            </div>
          </div>
          
          {/* Right Column: Single Image */}
          <div className="flex items-center justify-center mt-10 lg:mt-0">
             <Image 
                src="/images/hero-image.png" // Placeholder for the hero image
                alt="A happy Muslim couple representing a meaningful connection" 
                width={550}
                height={550}
                className="rounded-2xl object-cover w-full max-w-md h-auto aspect-square"
                priority
             />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;