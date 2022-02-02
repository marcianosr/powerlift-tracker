import React, { FC } from "react";
import { WeightRPE } from "../ExcersiseList";
import PreviousResult from "../PreviousResult";
import styles from "./styles.module.css";

type ExcersiseInfoItemProps = {
	excersise: string;
	sets: string;
	reps: string;
	currentLifts: WeightRPE;
	previousLifts: WeightRPE;
	idx: number;
	setsCounter: number;
};
const ExcersiseInfoItem: FC<ExcersiseInfoItemProps> = ({
	excersise,
	sets,
	reps,
	currentLifts,
	previousLifts,
	idx,
	setsCounter,
}) => {
	const getCurrentLiftReps = currentLifts.weight.split("x");
	const [currentWeight, currentReps] = getCurrentLiftReps;

	return (
		<li className={styles.listItem}>
			{/* <strong>Oefening</strong> */}
			<h2 className={styles.headingText}>{excersise}</h2>
			<section className={styles.container}>
				<section>
					<h3>To do</h3>
					<span className={styles.number}>{currentWeight}</span>
					<span className={styles.number}>{sets}</span>
					<span className={styles.lighterText}>sets</span>
					<span className={styles.number}>{reps}</span>
					<span className={styles.lighterText}>reps</span>
				</section>
				{/* {idx === 0 && <span>{setsCounter}</span>} */}
				<section>
					<h3>Resultaat </h3>
					<span>{currentWeight}</span> x<span>{currentReps}</span>@{" "}
					<span>{currentLifts.RPE}</span>
				</section>
			</section>

			<PreviousResult previousLifts={previousLifts} />
		</li>
	);
};

export default ExcersiseInfoItem;
