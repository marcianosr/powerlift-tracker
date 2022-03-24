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
import Button from "../Button";
import { getDatabase, ref, set } from "firebase/database";
import { format } from "date-fns";

type CurrentExerciseProps = {
	data: ExcelData[];
};

const CurrentExercise: FC<CurrentExerciseProps> = ({ data }) => {
	const [exercises, setExercises] = useState({
		total: 0,
		current: data[0],
		count: 1,
		exercisesLeft: data.length,
	});

	const [count, setCount] = useState(1);

	const [currentSet, setCurrentSet] = useState({
		total: exercises.current && exercises.current.sets,
		count: 1,
	});

	const isExerciseDone =
		currentSet.count === (exercises.current && exercises.current.sets);
	const exerciseIsDone = () => {
		setCurrentSet({ ...currentSet, count: 1 });
		setCount(count + 1);

		return setExercises({
			...exercises,
			current: data[count],
			count: count,
			exercisesLeft: exercises.exercisesLeft - 1,
		});
	};

	const exerciseHasMultipleSets =
		(exercises.current && exercises.current.sets) > 1 &&
		currentSet.count < (exercises.current && exercises.current.sets);

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
			exercisesLeft: exercises.exercisesLeft - 1,
		});
	};

	if (exercises.exercisesLeft === 0) {
		return (
			<section className={styles.container}>
				{exercises.exercisesLeft === 0 && (
					<Button
						variant="large"
						onClick={() => {
							const database = getDatabase();
							const today = format(new Date(), "yyyy-MM-dd");

							set(ref(database, `/user/marciano/${today}`), {
								...data,
							});
						}}
					>
						Finish training
					</Button>
				)}
			</section>
		);
	}

	return (
		<section className={styles.container}>
			<Title shade="light" variant="x-small">
				Doing
			</Title>

			{exercises.exercisesLeft === 0 && <h1>doneButton</h1>}

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
