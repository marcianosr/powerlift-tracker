import React, { FC } from "react";
import Button from "../Button";
import WeightsIcon from "../../public/icons/weights.svg";
import DoneIcon from "../../public/icons/done.svg";
import RPEIcon from "../../public/icons/rpe.svg";
import ChevronIcon from "../../public/icons/chevron.svg";
import styles from "./styles.module.scss";
import PreviousResultsButton from "../PreviousResultsButton";

type ActionsContainerProps = {
	markDone: () => void;
};

const ActionsContainer: FC<ActionsContainerProps> = ({ markDone }) => {
	return (
		<section className={styles.actionsContainer}>
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
			<div className={styles.buttons}>
				<PreviousResultsButton />
				<Button
					variant="smallRound"
					onClick={markDone}
					align="right"
					testId="doneButton"
				>
					<DoneIcon width={33} height={28} />
				</Button>
			</div>
		</section>
	);
};
export default ActionsContainer;
