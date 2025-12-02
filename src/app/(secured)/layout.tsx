'use client';

import "@/app/globals.css";
import { Box, ThemeProvider } from "@mui/material";

import AppBar from "@/components/AppBar/AppBar";
import SessionProvider from "@/contexts/Session";

import theme from "@/themes/theme";
import SignalRContextProvider from "@/contexts/SignalR";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/snr.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <SignalRContextProvider>
              <AppBar />
              <Box sx={{ textAlign: 'center', paddingTop: '72px', mx: 1 }}>
                {children}
              </Box>
            </SignalRContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
