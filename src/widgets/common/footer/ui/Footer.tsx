import { FooterAbout } from './FooterAbout';
import { FooterBottom } from './FooterBottom';
import { FooterContacts } from './FooterContacts';
import { FooterNewsletter } from './FooterNewsletter';
import { FooterServices } from './FooterServices';

export const Footer = () => {
  return (
    <footer className='bg-muted'>
      <div className='container mx-auto py-10 md:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <FooterAbout />
          <FooterServices />
          <FooterContacts />
          <FooterNewsletter />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};
