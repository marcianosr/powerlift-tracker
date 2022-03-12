import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

type WeightIndicatorProps = {
	weights: PlateNumbers[];
};

type PlateProps = {
	weight: PlateNumbers;
};

export type PlateNumbers = 25 | 20 | 15 | 10 | 5 | 2.5 | 1.25 | 0.5;

type Plates =
	| "red"
	| "blue"
	| "yellow"
	| "green"
	| "white"
	| "black"
	| "gray"
	| "silver";

type PlateMapping = {
	[key in PlateNumbers]: Plates;
};

const PLATE_MAPPING: PlateMapping = {
	25: "red",
	20: "blue",
	15: "yellow",
	10: "green",
	5: "white",
	2.5: "black",
	1.25: "gray",
	0.5: "silver",
};

const WeightIndicator: FC<WeightIndicatorProps> = ({ weights }) => {
	return (
		<div className={styles.weightIndicator}>
			{weights.map((weight: PlateNumbers, idx: number) => (
				<Plate weight={weight} key={idx} />
			))}
		</div>
	);
};

const Plate: FC<PlateProps> = ({ weight }) => {
	const plateStyles = classNames(styles.plate, styles[PLATE_MAPPING[weight]]);

	return <div data-testid={`plate-${weight}`} className={plateStyles}></div>;
};

export default WeightIndicator;
