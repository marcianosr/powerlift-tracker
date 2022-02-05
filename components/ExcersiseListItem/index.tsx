import classnames from "classnames";
import React, { ChangeEvent, FC, useState } from "react";
import { ExceriseInfoItems } from "./types";
import styles from "./styles.module.css";

type ExcersiseListItemProps = {
	item: ExceriseInfoItems;
	idx: number;
};

const ExcersiseListItem: FC<ExcersiseListItemProps> = ({ item, idx }) => {
	const [todo, setTodo] = useState({
		...item,
		done: false,
	});

	const parsedReps = item.reps
		.split(/x|<=|\s/)
		.filter((text: string) => text !== "")[0];

	const isDoneStyles = classnames(styles.label, {
		[styles.strike]: todo.done,
	});

	const onDone = (e: ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		const name = e.target.name;

		if (name === todo.excersise) {
			setTodo({
				...todo,
				done: isChecked,
			});
		}
	};
	return (
		<div className={styles.listContainer}>
			<section className={styles.container}>
				<span className={styles.secondaryText}>Tijd</span>
				<span className={styles.secondaryText}>Oefening</span>
				<span className={styles.secondaryText}>Sets</span>
			</section>
			<div className={styles.container}>
				<section className={styles.sidebar}>
					<span className={styles.smallText}>18:15</span>
				</section>
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
				<section className={styles.amountSets}>
					<span className={styles.setsNumber}>1</span>
				</section>
			</div>
		</div>
	);
};

export default ExcersiseListItem;
