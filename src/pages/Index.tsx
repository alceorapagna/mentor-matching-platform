
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import CoachingTypes from '@/components/home/CoachingTypes';
import FeaturedCoaches from '@/components/home/FeaturedCoaches';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout withPadding={false}>
      <HeroSection />
      <CoachingTypes />
      <FeaturedCoaches />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
