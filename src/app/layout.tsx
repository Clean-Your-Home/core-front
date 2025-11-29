import './reset.css';
import './globals.css';

import { Toaster } from '@/shared/ui/sonner';
import { Header } from '@/widgets/header/ui/Header';

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
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
