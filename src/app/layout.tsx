'use client';

import { SessionProvider } from "next-auth/react";
import ThemeRegistry from '@/components/ThemeRegistry';
import NavBar from '@/components/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionProvider>
          <ThemeRegistry>
            <NavBar />
            {children}
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
