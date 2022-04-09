export type ExerciseTypeMapping = {
	matches: any[];
	type: "barbell" | "dumbell" | "machine";
};

export const exerciseTypeMapping: ExerciseTypeMapping[] = [
	{
		matches: [
			/low bar squat/,
			/high bar squat/,
			/trap bar/,
			/bench press/,
			/deadlift/,
		],
		type: "barbell",
	},
	{
		matches: [/dumbell/, /db/],
		type: "dumbell",
	},
	{
		matches: [
			/standing calf raise/,
			/seated row/,
			/press around/,
			/facepulls/,
			/lateral raises/,
			/bayesian curl/,
			/cable overhead extension/,
			/leg extension/,
			/leg curl/,
			/lat pulldown/,
		],
		type: "machine",
	},
];

export const exerciseForType = (exercise: string) => {
	const cleanExerciseName = exercise.toLocaleLowerCase();

	const type =
		exerciseTypeMapping.find((item) =>
			item.matches.find((name) => cleanExerciseName.match(name))
		)?.type || "not-specified";

	return { type, exercise };
};
