import React, { FC, useState } from "react";
import Card from "../Card";
import WeightLine from "../WeightLine";
import WeightIndicator from "../WeightIndicator";
import styles from "./styles.module.scss";
import RPEContainer from "../RPEContainer";
import Title from "../Title";
import { Bars, divideWeightForPlates } from "../WeightIndicator/utils";
import SkipExercise from "./SkipExercise";
import ActionsContainer from "./ActionsContainer";
import { ExcelData } from "@/pages/training/[week]/[day]";

type CurrentExerciseProps = {
	data: ExcelData[];
};

const CurrentExercise: FC<CurrentExerciseProps> = ({ data }) => {
	const [exercises, setExercises] = useState({
		total: 0,
		current: data[0],
		count: 1,
	});

	const [count, setCount] = useState(1);
	const [currentSet, setCurrentSet] = useState({
		total: exercises.current.sets,
		count: 1,
	});

	const isExerciseDone = currentSet.count === exercises.current.sets;
	const exerciseIsDone = () => {
		setCurrentSet({ ...currentSet, count: 1 });
		setCount(count + 1);

		return setExercises({
			...exercises,
			current: data[count],
			count: count,
		});
	};

	const exerciseHasMultipleSets =
		exercises.current.sets > 1 && currentSet.count < exercises.current.sets;

	const markDone = () => {
		if (isExerciseDone) return exerciseIsDone();

		if (exerciseHasMultipleSets) {
			return setCurrentSet({
				...currentSet,
				count: currentSet.count + 1,
			});
		}
	};

	const onSkip = () => {
		setCount(count + 1);

		return setExercises({
			...exercises,
			current: data[count],
			count: count,
		});
	};

	return (
		<section className={styles.container}>
			<Title shade="light" variant="x-small">
				Doing
			</Title>
			{!exercises.current.plan ? (
				<SkipExercise
					exercise={exercises.current.exercise}
					onSkip={onSkip}
				/>
			) : (
				<>
					<Card>
						<section>
							<Title tag="h3" variant="small" shade="light">
								{exercises.current.exercise}
							</Title>
							<div className={styles.weightContent}>
								<span className={styles.subTitle}>
									Set {currentSet.count}
								</span>
								{exercises.current.type === "barbell" && (
									<WeightIndicator
										weights={divideWeightForPlates(
											+exercises.current.plan.weight -
												Bars.Olympic
										)}
									/>
								)}
								<WeightLine
									weight={exercises.current.plan.weight}
									reps={exercises.current.reps}
								/>
								<RPEContainer
									RPE={exercises.current.plan.RPE || ""}
								/>
							</div>
						</section>
					</Card>
					<ActionsContainer markDone={markDone} />
				</>
			)}
		</section>
	);
};

export default CurrentExercise;
