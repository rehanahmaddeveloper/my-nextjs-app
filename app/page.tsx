'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import JourneySection from '@/components/JourneySection';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import WaitlistModal from '@/components/WaitlistModal';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white text-gray-800 antialiased">
      <Header onWaitlistClick={openModal} />
      <main>
        <Hero onWaitlistClick={openModal} />
        <ProblemSection />
        <SolutionSection />
        <JourneySection />
        <Testimonials />
        <Faq />
        <CtaSection onWaitlistClick={openModal} />
      </main>
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HomePage;