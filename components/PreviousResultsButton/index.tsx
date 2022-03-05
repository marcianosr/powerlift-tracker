import React, { FC } from "react";
import Button from "../Button";
import styles from "./styles.module.scss";
import ChevronIcon from "../../public/icons/chevron.svg";
import Title from "../Title";

type PreviousResultsProps = {};

const PreviousResults: FC<PreviousResultsProps> = ({ children }) => {
	return (
		<Button
			variant="large"
			iconRight={<ChevronIcon width={15} height={15} />}
		>
			<div className={styles.previousContainer}>
				<Title variant="small" shade="darker">
					Previous
				</Title>
				<span>
					<span>185kg x 2</span> <span>@ 7.5</span>{" "}
				</span>
			</div>
		</Button>
	);
};

export default PreviousResults;
