import classNames from "classnames";
import React, { FC, CSSProperties } from "react";
import styles from "./styles.module.scss";

type WeightLineProps = {
	weight: number | string;
	reps: number;
};

interface FontSize extends CSSProperties {
	"--textLength": string;
}

// Check if this is possible with CSS Container queries

const WeightLine: FC<WeightLineProps> = ({ weight, reps }) => {
	const size = reps.toString().length < 4 ? 2.5 : 2;
	const weightTextIsTooLong = typeof weight === "string"; // strings are too long
	const hasAddedWeight = weightTextIsTooLong && weight.split("+")[0]; // when microloading to machines

	return (
		<>
			{weightTextIsTooLong ? (
				<div
					className={classNames(styles.weightContainer, styles.long)}
				>
					<div>
						{hasAddedWeight && (
							<>
								<span
									style={{ fontSize: "1.85rem" }}
									className={styles.weight}
								>
									{hasAddedWeight}
								</span>
								<span style={{ fontSize: "1.25rem" whiteSpace: "nowrap" }}>
									+ {weight.split("+")[1]}
								</span>
								<span className={styles.x}>x</span>{" "}
							</>
						)}
						{!hasAddedWeight && (
							<>
								<span className={styles.weight}>
									{weight.split("+")[0]}
								</span>
								<span className={styles.x}>x</span>{" "}
							</>
						)}
					</div>
					<span
						className={styles.reps}
						style={{ "--textLength": `${size}rem` } as FontSize}
					>
						{reps}
					</span>
				</div>
			) : (
				<div className={classNames(styles.weightContainer)}>
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
			)}
		</>
	);
};

export default WeightLine;
