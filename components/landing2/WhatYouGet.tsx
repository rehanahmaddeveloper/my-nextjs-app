
import React from 'react';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-soul-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const FeatureItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-soul-pink-light flex-shrink-0 flex items-center justify-center">
            <CheckIcon />
        </div>
        <p className="text-lg text-gray-700">{children}</p>
    </div>
);


const WhatYouGet: React.FC = () => {
  return (
    <section 
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Single Image */}
          <div className="flex justify-center items-center">
            <img 
              src="/what-you-get-combined.png" 
              alt="Members enjoying the Soul Deeds platform" 
              className="rounded-2xl max-w-md w-full"
            />
          </div>

          {/* Right Column: Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-soul-text">What You'll Get <span className="text-soul-purple">(Lifetime)</span></h2>
            <div className="w-20 h-1.5 bg-soul-purple mt-4 mb-10"></div>
            <div className="space-y-6">
              <FeatureItem>Lifetime <strong className="text-soul-text">premium profile</strong> access</FeatureItem>
              <FeatureItem>Guided <strong className="text-soul-text">conversation</strong> features</FeatureItem>
              <FeatureItem>Participation in SoulCircles <strong className="text-soul-text">(community events)</strong></FeatureItem>
              <FeatureItem>Impact badges & service <strong className="text-soul-text">logs</strong></FeatureItem>
              <FeatureItem><strong className="text-soul-text">Priority</strong> support</FeatureItem>
            </div>
            <p className="mt-10 text-gray-500">All 100% free — forever, no hidden charges.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
