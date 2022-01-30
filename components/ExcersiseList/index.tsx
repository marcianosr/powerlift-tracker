import React, { FC, Fragment } from "react";
import ExcersiseInfoItem from "../ExcersiseInfoItem";

type ExcersiseListProps = {
	excersises: ExceriseInfoItems[];
	reps: string;
	setsCounter: number;
};

type ExceriseInfoItems = {
	excersise: string;
	sets: string;
	reps: string;
	lastTimeLifts: LastTimeLifts;
};

export type LastTimeLifts = {
	lift: string;
	RPE: string;
};

const ExcersiseList: FC<ExcersiseListProps> = ({
	excersises,
	reps,
	setsCounter,
}) => (
	<ul>
		{excersises.map(
			(
				{
					excersise,
					sets,
					lastTimeLifts,
				}: {
					excersise: string;
					sets: string;
					lastTimeLifts: LastTimeLifts;
				},
				idx: number
			) => (
				<Fragment key={idx}>
					{idx === 0 && <h1>Sets over: {setsCounter}</h1>}
					{idx === 1 && <h1>Up next</h1>}
					<ExcersiseInfoItem
						excersise={excersise}
						sets={sets}
						reps={reps}
						lastTimeLifts={lastTimeLifts}
					/>
				</Fragment>
			)
		)}
	</ul>
);

export default ExcersiseList;
