import React, { FC, useState } from "react";
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
}) => {
	const [loadedBar, setLoadedBar] = useState({
		plates: divideWeightForPlates(+weight - Bars.Olympic),
		weight,
	});

	return (
		<>
			<Title tag="h3" variant="small" shade="light">
				Change load for this set
			</Title>
			<div className={styles.weightIndicatorContainer}>
				<p className={styles.weightText}>
					{loadedBar.weight}
					<span>kg</span>
				</p>
				<WeightIndicator size="large" weights={loadedBar.plates} />
				<div className={styles.bar}></div>
			</div>
			<div className={styles.scrollablePlates}>
				{sortedPlates.map((plateWeight) => (
					<FlatPlate
						weight={plateWeight as PlateNumbers}
						key={plateWeight}
						onClick={() => {
							setLoadedBar({
								...loadedBar,
								plates: [
									...loadedBar.plates,
									plateWeight as PlateNumbers,
								].sort((a, b) => a - b),
								weight: (loadedBar.weight +
									plateWeight) as PlateNumbers,
							});
						}}
					/>
				))}
			</div>
		</>
	);
};

export default ChangeLoadDrawerContent;
