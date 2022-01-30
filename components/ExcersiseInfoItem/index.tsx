import React, { FC } from "react";
import { LastTimeLifts } from "../ExcersiseList";

type ExcersiseInfoItemProps = {
	excersise: string;
	sets: string;
	reps: string;
	lastTimeLifts: LastTimeLifts;
};
const ExcersiseInfoItem: FC<ExcersiseInfoItemProps> = ({
	excersise,
	sets,
	reps,
	lastTimeLifts,
}) => {
	return (
		<li style={{ marginBottom: "2rem" }}>
			<strong>Oefening</strong>
			<div>{excersise}</div>
			<strong>Sets</strong>
			<div>{sets}</div>
			<strong>Reps</strong>
			<div>{reps}</div>
			<strong>Last time</strong>
			<div>
				Gewicht: {lastTimeLifts.lift} - RPE: {lastTimeLifts.RPE}
			</div>
		</li>
	);
};

export default ExcersiseInfoItem;
