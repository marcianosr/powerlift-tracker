import React, { FC, CSSProperties } from "react";
import styles from "./styles.module.scss";

type WeightLineProps = {
	weight: number;
	reps: number;
};

interface FontSize extends CSSProperties {
	"--textLength": string;
}

// Check if this is possible with CSS Container queries

const WeightLine: FC<WeightLineProps> = ({ weight, reps }) => {
	const size = reps.toString().length < 4 ? 2.5 : 2;

	return (
		<div className={styles.weightContainer}>
			<span className={styles.weight}>{weight}</span>
			<span className={styles.kg}>kg</span>{" "}
			<span className={styles.x}>x</span>{" "}
			<span
				className={styles.reps}
				style={{ "--textLength": `${size}rem` } as FontSize}
			>
				{reps}
			</span>
		</div>
	);
};

export default WeightLine;
