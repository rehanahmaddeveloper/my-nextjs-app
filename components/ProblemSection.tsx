import React from 'react';

interface ProblemCardProps {
  title: string;
  description: string;
}

const XIcon: React.FC = () => (
    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </div>
);

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col items-center text-center sm:items-start sm:text-left">
    <XIcon />
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'ENDLESS SWIPING',
      description: 'Getting lost in a sea of profiles with no serious intentions, leading to burnout.',
    },
    {
      title: 'SUPERFICIAL PROFILES',
      description: "Profiles that tell you nothing about a person's heart, values, or faith.",
    },
    {
      title: 'MISMATCHED VALUES',
      description: 'Difficulty meeting like-minded Muslims who truly care about faith and community.',
    },
    {
      title: 'PRESSURED & UNSAFE',
      description: "Feeling pressured or unsafe in an online space that wasn't built for you.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Tired of apps that don't <span className="text-[#87127C]">understand your values?</span>
        </h2>
        <div className="flex justify-center mt-4 mb-12">
            <svg width="57" height="4" viewBox="0 0 57 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="57" height="4" fill="#87127C"/>
            </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {problems.map((problem) => (
            <ProblemCard key={problem.title} title={problem.title} description={problem.description} />
          ))}
        </div>
        <p className="mt-12 text-gray-600 max-w-3xl mx-auto">
            You deserve a space where faith comes first, intentions are clear, and meaningful love is possible.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;