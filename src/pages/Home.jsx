import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import StatsCounter from '../components/home/StatsCounter';
import PromoFeatures from '../components/home/PromoFeatures';
import AboutSection from '../components/home/AboutSection';
import CourseFilterSection from '../components/home/CourseFilterSection';
import VideoCTA from '../components/home/VideoCTA';
import InstructorsSection from '../components/home/InstructorsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import BlogSection from '../components/home/BlogSection';
import PartnerLogos from '../components/home/PartnerLogos';
import VideoModal from '../components/common/VideoModal';

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div>
      <Hero onOpenVideo={() => setVideoOpen(true)} />
      <StatsCounter />
      <PromoFeatures />
      <AboutSection onOpenVideo={() => setVideoOpen(true)} />
      <CourseFilterSection />
      <VideoCTA onOpenVideo={() => setVideoOpen(true)} />
      <InstructorsSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <PartnerLogos />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1"
      />
    </div>
  );
}
