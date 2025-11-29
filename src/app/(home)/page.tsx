import {
  AboutSection,
  BlogPreview,
  FaqSection,
  GalleryPreview,
  HeroSection,
  ServicesSection,
} from '@/widgets';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GalleryPreview />
      <FaqSection />
      <BlogPreview />
    </>
  );
};

export default Home;
