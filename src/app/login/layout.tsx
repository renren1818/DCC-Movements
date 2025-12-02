'use client';

import "@/app/globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/themes/theme";
import SessionProvider from "@/contexts/Session";

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
