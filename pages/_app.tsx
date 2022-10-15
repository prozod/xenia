import "../styles/main.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Navigation from "../src/components/navigation/navigation.component";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    return (
        <>
            <Navigation />
            <AnimatePresence mode="wait">
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </>)
}

export default MyApp;
