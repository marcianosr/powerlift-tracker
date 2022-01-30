import React, { FC } from "react";

type ExcersiseInfoItemProps = {
	excersise: string;
	sets: string;
	reps: string;
};
const ExcersiseInfoItem: FC<ExcersiseInfoItemProps> = ({
	excersise,
	sets,
	reps,
}) => {
	return (
		<li style={{ marginBottom: "2rem" }}>
			<strong>Oefening</strong>
			<div>{excersise}</div>
			<strong>Sets</strong>
			<div>{sets}</div>
			<strong>Reps</strong>
			<div>{reps}</div>
		</li>
	);
};

export default ExcersiseInfoItem;
