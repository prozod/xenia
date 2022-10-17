import "../styles/main.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Navigation from "../src/components/navigation/navigation.component";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();
  return (
    <>
      <SessionProvider session={session}>
        <Navigation />
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </SessionProvider>
    </>
  );
}

export default MyApp;
