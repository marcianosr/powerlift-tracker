import React, { FC } from "react";
import Head from "next/head";

const Layout: FC = ({ children }) => {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
