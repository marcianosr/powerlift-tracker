import React, { FC, Fragment, useEffect, useState } from "react";
import ExcersiseInfoItem from "../ExcersiseInfoItem";
import styles from "./styles.module.css";

type ExcersiseListProps = {
	dataToLift: any;
};

export type WeightRPE = {
	weight: string;
	RPE: string;
};

const ExcersiseList: FC<ExcersiseListProps> = ({ dataToLift }) => {
	const [slideIndex, setSlideIndex] = useState(0);
	const excersiseToShow = dataToLift.slice(slideIndex, slideIndex + 2);
	const [currentExcersise] = excersiseToShow;
	const amountOfSets = +currentExcersise.sets;
	const [setsCounter, setSetsCounter] = useState(amountOfSets);

	const parsedReps = currentExcersise.reps
		.split(/x|<=|\s/)
		.filter((text: string) => text !== "")[0];

	useEffect(() => {
		setSetsCounter(amountOfSets);
	}, [amountOfSets, currentExcersise.excersise]);

	return (
		<ul className={styles.listItemContainer}>
			{excersiseToShow.map(
				(
					{
						excersise,
						sets,
						currentLifts,
						previousLifts,
					}: {
						excersise: string;
						sets: string;
						currentLifts: WeightRPE;
						previousLifts: WeightRPE;
					},
					idx: number
				) => (
					<Fragment key={idx}>
						{idx === 0 && <h1>Sets over: {setsCounter}</h1>}
						{idx === 1 && <h1>Up next</h1>}
						<ExcersiseInfoItem
							excersise={excersise}
							sets={sets}
							reps={parsedReps}
							currentLifts={currentLifts}
							previousLifts={previousLifts}
						/>
						{idx === 0 && (
							<button
								onClick={() => {
									setsCounter > 1
										? setSetsCounter(setsCounter - 1)
										: setSlideIndex((index) => index + 1);
								}}
							>
								Next
							</button>
						)}
					</Fragment>
				)
			)}
		</ul>
	);
};

export default ExcersiseList;
