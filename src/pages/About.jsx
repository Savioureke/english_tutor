import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import AboutSection from '../components/home/AboutSection';
import StatsCounter from '../components/home/StatsCounter';
import PromoFeatures from '../components/home/PromoFeatures';
import InstructorsSection from '../components/home/InstructorsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PartnerLogos from '../components/home/PartnerLogos';
import VideoModal from '../components/common/VideoModal';

export default function About() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="About Teacher Training & Monetization"
        subtitle="Empowering fluent English speakers worldwide through structured teaching methodology, step-by-step lesson procedures, and monetization systems."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="pt-8">
        <StatsCounter />
      </div>

      <AboutSection onOpenVideo={() => setVideoOpen(true)} />
      <PromoFeatures />
      <InstructorsSection />
      <TestimonialsSection />
      <PartnerLogos />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1"
      />
    </div>
  );
}
