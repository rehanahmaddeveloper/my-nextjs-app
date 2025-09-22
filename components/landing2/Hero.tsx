// FIX: Add global JSX namespace declaration to fix errors with intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-soul-pink-gradient pt-28 pb-12 md:pb-20 overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/50 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200/50 rounded-full opacity-50 blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-soul-text leading-tight">
              Love shouldn't expire. <br />
              <span className="text-soul-purple">Neither should your</span> <br />
              access.
            </h1>
            <div className="w-24 h-1.5 bg-soul-purple mt-6 mb-8 mx-auto lg:mx-0"></div>
            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              We're handpicking our first 30 Soul Builders to shape Soul Deeds, a new Muslim matrimonial platform where faith, service, and real connection come together.
            </p>
            <div className="mt-8 bg-soul-pink-box rounded-2xl shadow-lg relative p-4 pl-8 max-w-lg mx-auto lg:mx-0">
              <div className="absolute left-0 top-[-2px] bottom-[-2px] w-1.5 bg-soul-purple rounded-full"></div>
              <p className="text-gray-700">
                As an early member, you'll get <span className="font-bold text-soul-purple">lifetime free access</span> to premium features in return for your feedback and honest reviews.
              </p>
            </div>
          </div>
          
          <div className="relative h-[450px] flex justify-center items-center">
            <div className="absolute inset-0 bg-purple-100/60 rounded-full blur-3xl opacity-70"></div>
            <img 
              src="/phones-mockup.png" 
              alt="Soul Deeds App Mockup" 
              className="relative z-10 max-h-full w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;