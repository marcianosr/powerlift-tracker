import "@/styles/global.scss";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") {
		const supportsContainerQueries =
			"container" in document.documentElement.style;

		if (!supportsContainerQueries) {
			import("container-query-polyfill");
		}
	}
	return <Component {...pageProps} />;
}
