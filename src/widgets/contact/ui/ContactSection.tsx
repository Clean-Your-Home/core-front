import { ContactForm } from './ContactForm';
import { ContactHeader } from './ContactHeader';
import { ContactInfo } from './ContactInfo';

export const ContactSection = () => {
  return (
    <section className='bg-muted/50 py-8 md:py-16' id='contacts'>
      <div className='container mx-auto px-4'>
        <ContactHeader />

        <div className='mt-12 grid gap-8 md:grid-cols-2'>
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};
