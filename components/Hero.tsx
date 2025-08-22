import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onWaitlistClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onWaitlistClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF5FD] to-white pt-20 pb-20 lg:pt-32 lg:pb-24">
       <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Do Good.
              <br />
              <span className="text-[#87127C]">Connect Deeply</span>
            </h1>
            <div className="mt-4 flex justify-center lg:justify-start">
                <svg width="57" height="4" viewBox="0 0 57 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="57" height="4" fill="#87127C"/>
                </svg>
            </div>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              SoulDeeds is the first Muslim matrimonial platform that combines faith, service, and meaningful connection, no swiping, no pressure, just genuine connections.
            </p>
            <div className="mt-10">
              <button
                onClick={onWaitlistClick}
                className="w-full md:w-auto bg-gradient-to-r from-[#a53a9b] to-[#87127C] text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-[#87127C]/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Join the Waitlist Now
              </button>
            </div>
          </div>
          <div className="flex justify-center">
             <Image 
                src="/images/hero-image.png" 
                alt="Happy couple" 
                width={552}
                height={368}
                className="rounded-3xl object-cover"
                priority
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;