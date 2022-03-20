import React, { FC } from "react";
import Button from "../Button";
import Card from "../Card";
import Title from "../Title";
import ChevronIcon from "../../public/icons/chevron.svg";
import styles from "./styles.module.scss";

type SkipExerciseProps = {
	exercise: string;
	onSkip: () => void;
};

const SkipExercise: FC<SkipExerciseProps> = ({ exercise, onSkip }) => {
	return (
		<>
			<Card>
				<Title tag="h3" variant="small" shade="light">
					{exercise}
				</Title>
				<span className={styles.subTitle}>
					It's skip "{exercise}" day!
				</span>
			</Card>
			<div className={styles.buttons}>
				<Button
					variant="large"
					onClick={onSkip}
					align="right"
					iconRight={<ChevronIcon width={15} height={15} />}
				>
					Go to next
				</Button>
			</div>
		</>
	);
};
export default SkipExercise;
