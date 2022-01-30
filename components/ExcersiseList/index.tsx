import React, { FC, Fragment } from "react";
import ExcersiseInfoItem from "../ExcersiseInfoItem";

type ExcersiseListProps = {
	excersises: ExceriseInfoItems[];
	reps: string;
};

type ExceriseInfoItems = {
	excersise: string;
	sets: string;
	reps: string;
};

const ExcersiseList: FC<ExcersiseListProps> = ({ excersises, reps }) => (
	<ul>
		{excersises.map(
			(
				{ excersise, sets }: { excersise: string; sets: string },
				idx: number
			) => (
				<Fragment key={idx}>
					<ExcersiseInfoItem
						excersise={excersise}
						sets={sets}
						reps={reps}
					/>
				</Fragment>
			)
		)}
	</ul>
);

export default ExcersiseList;
