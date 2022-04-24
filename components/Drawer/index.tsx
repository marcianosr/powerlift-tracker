import React, { FC } from "react";
import Button from "../Button";
import styles from "./styles.module.scss";

type DrawerProps = {
	onClick?: () => void;
	onClose: () => void;
};

const Drawer: FC<DrawerProps> = ({ onClick, onClose, children }) => (
	<>
		<div className={styles.overlay}></div>
		<section className={styles.drawer}>
			<div className={styles.buttonContainer}>
				<Button onClick={onClick} variant="dark">
					Save
				</Button>
				<Button onClick={() => onClose()} variant="extraSmallRound">
					X
				</Button>
			</div>
			{children}
		</section>
	</>
);

export default Drawer;
