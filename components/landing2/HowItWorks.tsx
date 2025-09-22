

// FIX: Add global JSX namespace declaration to fix errors with intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import React from 'react';

// Reusable card for each step in the process.
const StepCard: React.FC<{ number: string; title: string; description: string; iconSrc: string; iconAlt: string }> = ({ number, title, description, iconSrc, iconAlt }) => (
  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden">
    {/* Background number */}
    <span className="absolute top-[10px] right-[10px] text-9xl font-extrabold text-gray-100 select-none">{number}</span>
    
    <div className="relative z-10">
      {/* Icon placeholder - user will provide their own SVG with background */}
      <img src={iconSrc} alt={iconAlt} className="w-16 h-16 mb-6" />
      
      <h3 className="text-xl font-bold text-soul-text mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

// Icon for the "limited spots" message.
const LightningBoltIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
);

interface HowItWorksProps {
  onWaitlistClick: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onWaitlistClick }) => {
  const steps = [
    {
      number: "01",
      title: "Sign Up Today",
      description: "Create your SoulDeeds profile.",
      iconSrc: "/icon-signup.svg", // Placeholder for user's image
      iconAlt: "User profile icon"
    },
    {
      number: "02",
      title: "Experience the Platform",
      description: "Join values-based matches & service-driven events.",
      iconSrc: "/icon-experience.svg", // Placeholder for user's image
      iconAlt: "Smartphone icon"
    },
    {
      number: "03",
      title: "Share Feedback",
      description: "Leave your review, and your premium access is yours forever.",
      iconSrc: "/icon-feedback.svg", // Placeholder for user's image
      iconAlt: "Feedback stars icon"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-soul-pink-gradient/10 to-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-soul-text">
            How It Works <span className="text-soul-purple">(3 Simple Steps)</span>
          </h2>
          <div className="w-20 h-1.5 bg-soul-purple mt-4 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              number={step.number} 
              title={step.title} 
              description={step.description} 
              iconSrc={step.iconSrc}
              iconAlt={step.iconAlt}
            />
          ))}
        </div>
        
        <div className="text-center mt-20">
          <button 
            onClick={onWaitlistClick}
            className="bg-soul-purple text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-soul-purple-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Claim My Lifetime Spot
          </button>
          <p className="mt-6 text-gray-600 flex items-center justify-center flex-wrap gap-2">
            <span className="text-soul-purple">
              <LightningBoltIcon />
            </span>
            Only <span className="font-bold text-soul-purple whitespace-nowrap">30 lifetime spots</span> available — once they're gone, they're gone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;