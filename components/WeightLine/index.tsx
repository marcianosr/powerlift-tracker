import React, { FC, CSSProperties } from "react";
import styles from "./styles.module.scss";

type WeightLineProps = {
	weight: number | string;
	reps: string;
};

interface FontSize extends CSSProperties {
	"--textLength": string;
}

// Check if this is possible with CSS Container queries

const WeightLine: FC<WeightLineProps> = ({ weight, reps }) => {
	const size = reps.length < 4 ? 2.5 : 2;

	return (
		<div className={styles.weightContainer}>
			<span className={styles.weight}>{weight}</span>
			{typeof weight === "number" && (
				<span className={styles.kg}>kg</span>
			)}{" "}
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
