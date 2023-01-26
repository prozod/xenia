import "../styles/main.css"
import type { AppProps } from "next/app"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import Navigation from "../src/components/navigation/navigation.component"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
	const router = useRouter()
	const [queryClient] = useState(() => new QueryClient())
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={true} />
				<SessionProvider session={session}>
					<Navigation />
					<AnimatePresence mode="wait">
						<Component
							{...pageProps}
							key={router.route}
						/>
					</AnimatePresence>
				</SessionProvider>
			</QueryClientProvider>
		</>
	)
}

export default MyApp
