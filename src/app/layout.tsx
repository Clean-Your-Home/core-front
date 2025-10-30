import './reset.css';
import './globals.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
