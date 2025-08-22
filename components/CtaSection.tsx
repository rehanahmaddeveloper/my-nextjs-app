import React from 'react';
import Image from 'next/image';

interface CtaSectionProps {
  onWaitlistClick: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onWaitlistClick }) => {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Be Among the First to
              <br />
              <span className="text-[#87127C]">Build Love with Purpose</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Spaces on our early access waitlist are limited. Sign up today to secure your spot and be part of the movement to redefine halal matchmaking.
            </p>
            <div className="mt-10">
              <button
                onClick={onWaitlistClick}
                className="w-full md:w-auto bg-gradient-to-r from-[#a53a9b] to-[#87127C] text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-[#87127C]/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Join the Waitlist
              </button>
            </div>
          </div>
          <div className="flex justify-center">
             <Image 
                src="/images/cta-illustration.png" 
                alt="Illustration of a couple talking"
                width={500}
                height={350} 
                className="max-w-md w-full h-auto"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;