import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

type WeightIndicatorProps = {
	weights: PlateNumbers[];
	size: "small" | "large";
};

type PlateProps = {
	weight: PlateNumbers;
	size: "small" | "large";
	variant?: "default" | "flat";
	onClick?: () => void;
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

export const PLATE_MAPPING: PlateMapping = {
	25: "red",
	20: "blue",
	15: "yellow",
	10: "green",
	5: "white",
	2.5: "black",
	1.25: "gray",
	0.5: "silver",
};

const PLATE_SIZES = {
	large: { width: 20, heightMultiplier: 5 },
	small: { width: 4, heightMultiplier: 1 },
};

const WeightIndicator: FC<WeightIndicatorProps> = ({ weights, size }) => {
	return (
		<div
			className={styles.weightIndicator}
			style={
				{
					"--heightMultiplier": PLATE_SIZES[size].heightMultiplier,
				} as any
			}
		>
			{weights.map((weight: PlateNumbers, idx: number) => (
				<Plate size={size} weight={weight} key={idx} />
			))}
		</div>
	);
};

export const Plate: FC<PlateProps> = ({ weight, size }) => {
	const plateStyles = classNames(styles.plate, styles[PLATE_MAPPING[weight]]);

	return (
		<div
			style={
				{
					"--heightMultiplier": PLATE_SIZES[size].heightMultiplier,
					width: PLATE_SIZES[size].width,
				} as any
			}
			data-testid={`plate-${weight}`}
			className={plateStyles}
		></div>
	);
};

export const FlatPlate: FC<Omit<PlateProps, "size">> = ({
	weight,
	onClick,
}) => {
	const plateStyles = classNames(
		styles.flatPlate,
		styles[PLATE_MAPPING[weight]]
	);

	return (
		<div
			data-testid={`plate-${weight}`}
			className={plateStyles}
			onClick={onClick}
		>
			{weight}
		</div>
	);
};

export default WeightIndicator;
