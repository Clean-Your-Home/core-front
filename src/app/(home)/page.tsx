import {
  AboutSection,
  BlogPreview,
  ContactSection,
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
      <ContactSection />
    </>
  );
};

export default Home;
