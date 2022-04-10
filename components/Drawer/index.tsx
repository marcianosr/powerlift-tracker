import React, { FC } from "react";
import styles from "./styles.module.scss";

const Drawer: FC = ({ children }) => (
	<>
		<div className={styles.overlay}></div>
		<section className={styles.drawer}>{children}</section>
	</>
);

export default Drawer;
