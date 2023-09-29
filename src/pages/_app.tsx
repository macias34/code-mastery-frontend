import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

import { Toaster } from "@/shared/components/toaster";
import "@/styles/globals.css";

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <Component {...pageProps} />
            <Toaster />
          </NextThemesProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
