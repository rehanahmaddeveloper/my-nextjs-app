'use client';

// FIX: Add global JSX namespace declaration to fix errors with intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/landing2/Hero';
import WhySection from '@/components/landing2/WhySection';
import HowItWorks from '@/components/landing2/HowItWorks';
import WhatYouGet from '@/components/landing2/WhatYouGet';
import Faq from '@/components/landing2/Faq';
import Cta from '@/components/landing2/Cta';
import Footer from '@/components/Footer';
import WaitlistModal from '@/components/WaitlistModal';

const LandingPage2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      <Header onWaitlistClick={openModal} />
      <main>
        <Hero />
        <WhySection />
        <HowItWorks onWaitlistClick={openModal} />
        <WhatYouGet />
        <Faq />
        <Cta onWaitlistClick={openModal} />
      </main>
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LandingPage2;