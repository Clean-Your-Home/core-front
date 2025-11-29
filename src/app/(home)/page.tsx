import { AboutSection } from '@/widgets/about';
import { HeroSection } from '@/widgets/hero';
import { ServicesSection } from '@/widgets/services';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
};

export default Home;
