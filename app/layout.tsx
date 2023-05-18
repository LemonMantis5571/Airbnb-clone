import RegisterModal from './components/modals/RegisterModal'
import { Toaster } from "react-hot-toast";
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import { useSession } from 'next-auth/react';

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currenUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser = {currenUser} />

        {children}
        
      </body>
    </html>
  )
}
