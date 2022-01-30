import React, { FC } from "react";
import { WeightRPE } from "../ExcersiseList";
import styles from "./styles.module.css";

type ExcersiseInfoItemProps = {
	excersise: string;
	sets: string;
	reps: string;
	currentLifts: WeightRPE;
	previousLifts: WeightRPE;
};
const ExcersiseInfoItem: FC<ExcersiseInfoItemProps> = ({
	excersise,
	sets,
	reps,
	currentLifts,
	previousLifts,
}) => {
	return (
		<li className={styles.listItem}>
			{/* <strong>Oefening</strong> */}
			<h2 className={styles.headingText}>{excersise}</h2>
			<section className={styles.setsRepsContainer}>
				<strong>Sets</strong>
				<div>{sets}</div>
				<strong>Reps</strong>
				<div>{reps}</div>
				<strong>Weight</strong>
				{currentLifts.weight} @ {currentLifts.RPE}
			</section>

			<section className={styles.smallText}>
				<strong>Previous</strong>
				<div>
					Gewicht: {previousLifts.weight} - RPE: {previousLifts.RPE}
				</div>
			</section>
		</li>
	);
};

export default ExcersiseInfoItem;
