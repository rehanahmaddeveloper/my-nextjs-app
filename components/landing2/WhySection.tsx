// FIX: Add global JSX namespace declaration to fix errors with intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import React from 'react';

// This SVG component creates the custom white curve at the bottom of the section.
const SectionCurve: React.FC = () => (
  <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      className="relative block w-full h-[50px] sm:h-[80px] lg:h-[100px]"
    >
      <path 
        d="M1200 120L0 120V0C0 0 200 70 600 70C1000 70 1200 0 1200 0V120Z"
        className="fill-white"
      ></path>
    </svg>
  </div>
);


const WhySection: React.FC = () => {
  return (
    // The parent needs to be relative, and have padding at the bottom to make space for the curve.
    <section className="relative pt-32 pb-40 sm:pb-40 lg:pb-48">
      <img 
        src="/why-section-bg.png" 
        alt="" 
        aria-hidden="true" 
        className="absolute inset-0 w-full h-full object-cover lg:object-contain -z-1" 
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-4 text-white">Why We're Doing This</h2>
            <div className="w-20 h-1.5 bg-white mb-8 mx-auto lg:mx-0"></div>
            <p className="text-lg text-purple-100 mb-6 max-w-lg mx-auto lg:mx-0">
              SoulDeeds isn't just another app. We're building a dignified, halal space where Muslims connect through shared values and acts of service.
            </p>
            <p className="text-lg text-purple-100 max-w-lg mx-auto lg:mx-0">
              By joining early, you're helping us shape the future of meaningful connections, not just swipes.
            </p>
          </div>
          
          {/* Right Column: Single Image */}
          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <img 
              src="/why-section-combined.png" 
              alt="Muslims connecting through shared values" 
              className="rounded-2xl max-w-md w-full"
            />
          </div>
          
        </div>
      </div>

      {/* The decorative curve at the bottom */}
      <SectionCurve />
    </section>
  );
};

export default WhySection;