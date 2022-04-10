import React, { FC } from "react";
import Title from "../Title";
import WeightIndicator, {
	FlatPlate,
	PlateNumbers,
	PLATE_MAPPING,
} from "../WeightIndicator";
import { Bars, divideWeightForPlates } from "../WeightIndicator/utils";
import styles from "./styles.module.scss";

type ChangeLoadDrawerContentProps = {
	weight: PlateNumbers;
};

const sortedPlates = Object.entries(PLATE_MAPPING)
	.sort(([weightA], [weightB]) => Number(weightB) - Number(weightA))
	.map(([weight]) => Number(weight));

const ChangeLoadDrawerContent: FC<ChangeLoadDrawerContentProps> = ({
	weight,
}) => (
	<>
		<Title tag="h3" variant="small" shade="light">
			Change load for this set
		</Title>
		<div className={styles.weightIndicatorContainer}>
			<p className={styles.weightText}>
				{weight}
				<span>kg</span>
			</p>
			<WeightIndicator
				size="large"
				weights={divideWeightForPlates(+weight - Bars.Olympic)}
			/>
			<div className={styles.bar}></div>
		</div>
		<div className={styles.scrollablePlates}>
			{sortedPlates.map((weight) => (
				<FlatPlate weight={weight as PlateNumbers} key={weight} />
			))}
		</div>
	</>
);

export default ChangeLoadDrawerContent;
