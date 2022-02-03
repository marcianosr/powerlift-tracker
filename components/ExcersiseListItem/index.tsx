import classnames from "classnames";
import React, { ChangeEvent, FC, useState } from "react";
import { ExceriseInfoItems } from "../ExcersiseInfoItem/types";
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

	const isDoneStyles = classnames({
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
		<div className={styles.inputContainer}>
			<input
				type="checkbox"
				value={item.excersise}
				id={item.excersise}
				name={item.excersise}
				onChange={onDone}
			/>
			<label htmlFor={item.excersise} className={isDoneStyles}>
				<strong>{item.excersise}</strong>
				<div>
					<span>{item.sets}</span>
					<span>{item.reps}</span>
					<span>{item.weight}</span>
				</div>
			</label>
		</div>
	);
};

export default ExcersiseListItem;
