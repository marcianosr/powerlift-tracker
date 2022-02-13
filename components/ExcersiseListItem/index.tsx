import classnames from "classnames";
import React, { MouseEvent, FC, useEffect, useState } from "react";
import { ExceriseInfoItems } from "./types";
import styles from "./styles.module.css";

type ExcersiseListItemProps = {
	item: ExceriseInfoItems;
	idx: number;
};

const ExcersiseListItem: FC<ExcersiseListItemProps> = ({ item, idx }) => {
	const parsedReps = item.reps
		.split(/x|<=|\s/)
		.filter((text: string) => text !== "")[0];

	return (
		<div className={styles.listContainer}>
			<div className={styles.container}>
				<section>
					<div className={styles.excersise}>{item.excersise}</div>
					<span className={styles.innerContainer}>
						<span className={styles.weight}>
							{item.weight.split("kg")[0]}
							<span className={styles.kg}>kg</span>
						</span>
						<div className={styles.setsReps}>
							<span className={styles.semiBigText}>
								{item.sets}
							</span>
							<span className={styles.x}>x</span>
							<span className={styles.semiBigText}>
								{parsedReps}
							</span>
						</div>
					</span>
				</section>
			</div>
		</div>
	);
};

export default ExcersiseListItem;
