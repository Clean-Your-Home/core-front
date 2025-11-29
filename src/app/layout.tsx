import './reset.css';
import './globals.css';

import { Toaster } from '@/shared/ui/sonner';
import { Footer, Header } from '@/widgets';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
