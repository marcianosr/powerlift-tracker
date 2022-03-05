import React, { FC } from "react";
import styles from "./styles.module.scss";

type RPEContainerProps = {
	RPE?: number;
};

const RPEContainer: FC<RPEContainerProps> = ({ RPE }) => {
	return (
		<div className={styles.RPEContainer}>
			<span>@</span>
			{!RPE && (
				<div
					data-testid="empty-rpe"
					className={styles.emptyRPEContainer}
				></div>
			)}
			{RPE && <div>{RPE}</div>}
		</div>
	);
};

export default RPEContainer;
