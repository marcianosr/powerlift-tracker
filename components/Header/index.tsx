import React, { FC } from "react";
import Title from "../Title";
import ChevronIcon from "../../public/icons/chevron.svg";

import styles from "./styles.module.scss";

type HeaderProps = {
	pageTitle: string | string[] | undefined;
};

const Header: FC<HeaderProps> = ({ pageTitle }) => (
	<header className={styles.header}>
		<ChevronIcon width={22} height={22} />
		<Title shade="light" tag="h1" variant="small">
			{pageTitle}
		</Title>
	</header>
);

export default Header;
