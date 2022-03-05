import React, { FC } from "react";
import styles from "./styles.module.scss";

type WeightLineProps = {
	weight: number;
	reps: number;
};

const WeightLine: FC<WeightLineProps> = ({ weight, reps }) => {
	return (
		<div className={styles.weightContainer}>
			<span className={styles.weight}>{weight}</span>
			<span className={styles.kg}>kg</span>{" "}
			<span className={styles.x}>x</span>{" "}
			<span className={styles.reps}>{reps}</span>
		</div>
	);
};

export default WeightLine;
