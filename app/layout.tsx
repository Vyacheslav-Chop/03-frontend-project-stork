import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import SideBar from '@/components/SideBar/SideBar';
// import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Leleka',
  description: 'Зручний онлайн-трекер для майбутніх мам',
  openGraph: {
    title: 'Leleka',
    description: 'Зручний онлайн-трекер для майбутніх мам',
    url: 'https://Leleka.app',
    images: '',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={roboto.variable}>
        <TanStackProvider>
          {/* <AuthProvider> */}
          <Header />
          <Breadcrumbs />
          <SideBar />
          <main>{children}</main>
          {modal}
          {/* </AuthProvider> */}
        </TanStackProvider>
      </body>
    </html>
  );
}
