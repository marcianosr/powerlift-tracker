import { ExcelData } from "@/pages/training/[week]/[day]";
import { useDataSheet } from "providers/SheetDataProvider";
import React, { FC, useEffect, useState } from "react";
import HorizontalSwipe, { Direction } from "../HorizontalSwipe";
import Title from "../Title";
import WeightIndicator, {
	FlatPlate,
	PlateNumbers,
	PLATE_MAPPING,
} from "../WeightIndicator";
import { Bars, divideWeightForPlates } from "../WeightIndicator/utils";
import styles from "./styles.module.scss";

type ChangeLoadDrawerContentProps = {
	currentExercise: ExcelData;
	loadedBar: {
		weight: number;
		plates: PlateNumbers[];
	};
	setLoadedBar: (state: { plates: PlateNumbers[]; weight: number }) => void;
};

const sortedPlates = Object.entries(PLATE_MAPPING)
	.sort(([weightA], [weightB]) => Number(weightB) - Number(weightA))
	.map(([weight]) => Number(weight));

const handleRemovePlatesByDirection = (
	plates: PlateNumbers[],
	direction: Direction
) => (direction === "left" ? plates.slice(1) : plates.slice(0, -1));

const calculateWeight = (plates: PlateNumbers[]) =>
	plates.reduce<number>((total, weight) => total + weight * 2, Bars.Olympic);

const addPlates = (
	loadedBar: { plates: PlateNumbers[]; weight: number },
	plateWeight: PlateNumbers,
	setLoadedBar: (state: { plates: PlateNumbers[]; weight: number }) => void
) => {
	const plates = [...loadedBar.plates, plateWeight].sort((a, b) => a - b);

	setLoadedBar({
		plates,
		weight: calculateWeight(plates),
	});
};

const removePlates = (
	loadedBar: { plates: PlateNumbers[]; weight: number },
	setLoadedBar: (state: { plates: PlateNumbers[]; weight: number }) => void,
	direction: Direction
) => {
	const plates = [
		...handleRemovePlatesByDirection(loadedBar.plates, direction),
	];

	setLoadedBar({
		plates,
		weight: calculateWeight(plates),
	});
};

const ChangeLoadDrawerContent: FC<ChangeLoadDrawerContentProps> = ({
	currentExercise,
	loadedBar,
	setLoadedBar,
}) => {
	return (
		<>
			<Title tag="h3" variant="small" shade="light">
				Change load for this set
			</Title>
			<HorizontalSwipe
				action={(direction) =>
					removePlates(loadedBar, setLoadedBar, direction)
				}
			>
				<div className={styles.weightIndicatorContainer}>
					<p className={styles.weightText}>
						{loadedBar.weight}
						<span>kg</span>
					</p>

					<WeightIndicator size="large" weights={loadedBar.plates} />
					<div className={styles.bar}></div>
				</div>
			</HorizontalSwipe>

			<div className={styles.scrollablePlates}>
				{sortedPlates.map((plateWeight) => (
					<FlatPlate
						weight={plateWeight as PlateNumbers}
						key={plateWeight}
						onClick={() =>
							addPlates(
								loadedBar,
								plateWeight as PlateNumbers,
								setLoadedBar
							)
						}
					/>
				))}
			</div>
		</>
	);
};

export default ChangeLoadDrawerContent;
