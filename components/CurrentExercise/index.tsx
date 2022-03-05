import React, { FC } from "react";
import Button from "../Button";
import Card from "../Card";
import WeightLine from "../WeightLine";
import WeightIndicator from "../WeightIndicator";
import PreviousResultsButton from "../PreviousResultsButton";
import WeightsIcon from "../../public/icons/weights.svg";
import RPEIcon from "../../public/icons/rpe.svg";
import ChevronIcon from "../../public/icons/chevron.svg";
import styles from "./styles.module.scss";
import RPEContainer from "../RPEContainer";
import Title from "../Title";

type CurrentExerciseProps = {};

const CurrentExercise: FC<CurrentExerciseProps> = () => {
	return (
		<section className={styles.container}>
			<Title shade="light" variant="x-small">
				Doing
			</Title>
			<Card>
				<section>
					<Title tag="h3" variant="small" shade="light">
						Competition Squat
					</Title>
					<div className={styles.weightContent}>
						<span className={styles.subTitle}>Set 1</span>
						<WeightIndicator weights={[10, 15, 20, 25, 25]} />
						<WeightLine weight={190} reps={4} />
						<RPEContainer />
					</div>
				</section>
			</Card>
			<section className={styles.actionsContainer}>
				<PreviousResultsButton />
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
