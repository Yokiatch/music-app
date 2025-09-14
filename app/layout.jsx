// app/layout.jsx

import { Figtree } from 'next/font/google';
import './globals.css';

import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import { MyUserContextProvider } from '@/hooks/useUser';    // ensure this matches your export
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
};

export default async function RootLayout({ children }) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <MyUserContextProvider>
            <ModalProvider>
              <div className="h-full flex">
                <Sidebar songs={userSongs}>{children}</Sidebar>
                <Player />
              </div>
            </ModalProvider>
          </MyUserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
