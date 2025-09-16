import { SpotifyAuthProvider } from '../providers/SpotifyAuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpotifyAuthProvider>
          {children}
        </SpotifyAuthProvider>
      </body>
    </html>
  );
}
