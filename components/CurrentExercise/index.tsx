import React, { FC, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import WeightLine from "../WeightLine";
import WeightIndicator from "../WeightIndicator";
import PreviousResultsButton from "../PreviousResultsButton";
import WeightsIcon from "../../public/icons/weights.svg";
import DoneIcon from "../../public/icons/done.svg";
import RPEIcon from "../../public/icons/rpe.svg";
import ChevronIcon from "../../public/icons/chevron.svg";
import styles from "./styles.module.scss";
import RPEContainer from "../RPEContainer";
import Title from "../Title";
import { Bars, divideWeightForPlates } from "../WeightIndicator/utils";

type CurrentExerciseProps = {
	data: {
		id: string;
		exercise: string;
		day: "A" | "B" | "C" | "D";
		reps: number;
		sets: number;
		result: {
			id: string;
			day: "A" | "B" | "C" | "D";
			weight: number;
			unit: "kg" | "lbs";
			reps: string[];
			RPE: number;
		};
		type: "barbell" | "machine" | "dumbell";
	}[];
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

	console.log(data);

	return (
		<section className={styles.container}>
			<Title shade="light" variant="x-small">
				Doing
			</Title>
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
									exercises.current.result.weight -
										Bars.Olympic
								)}
							/>
						)}
						<WeightLine
							weight={exercises.current.result.weight}
							reps={exercises.current.reps}
						/>
						<RPEContainer RPE={exercises.current.result.RPE || 0} />
					</div>
				</section>
			</Card>
			<section className={styles.actionsContainer}>
				<div className={styles.buttons}>
					<PreviousResultsButton />
					<Button
						iconLeft={<DoneIcon width={25} height={25} />}
						variant="large"
						onClick={markDone}
					>
						Mark done
					</Button>
				</div>
				<div className={styles.buttons}>
					<Button
						iconLeft={<WeightsIcon />}
						iconRight={<ChevronIcon width={15} height={15} />}
					>
						Change load
					</Button>
					<Button
						iconLeft={<span className={styles.hashIcon}>#</span>}
						iconRight={<ChevronIcon width={15} height={15} />}
					>
						Change reps
					</Button>
					<Button
						iconLeft={<RPEIcon />}
						iconRight={<ChevronIcon width={15} height={15} />}
					>
						Set RPE
					</Button>
				</div>
			</section>
		</section>
	);
};

export default CurrentExercise;
