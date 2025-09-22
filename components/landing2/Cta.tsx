import React from 'react';

interface CtaProps {
  onWaitlistClick: () => void;
}

const Cta: React.FC<CtaProps> = ({ onWaitlistClick }) => {
  return (
    <section className="py-24 bg-white">
      {/* Increased horizontal padding on larger screens and reduced gap to bring content closer */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-soul-text leading-tight">
              Be one of the first <br/>
              <span className="text-soul-purple">SoulBuilders.</span>
            </h2>
            <p className="text-lg text-gray-600 my-8 max-w-md mx-auto lg:mx-0">
              Spaces on our early access waitlist are limited. Sign up today to secure your spot and be part of the movement to redefine halal matchmaking.
            </p>
            {/* Updated button to be pill-shaped and smaller */}
            <button 
              onClick={onWaitlistClick}
              className="bg-soul-purple text-white font-bold text-base px-5 py-3 rounded-full hover:bg-soul-purple-dark transition-all duration-300 shadow-lg shadow-soul-purple/30 hover:shadow-xl hover:shadow-soul-purple/50 transform hover:-translate-y-1">
              Yes, I Want Lifetime Access
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img 
                src="/cta-illustration.svg" 
                alt="Illustration of two people sitting on a couch with a laptop" 
                className="w-full max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;