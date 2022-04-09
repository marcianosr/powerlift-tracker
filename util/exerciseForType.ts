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
			/hatfield bulgarian split squats/,
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
			/overhead extension/,
			/leg extension/,
			/leg curl/,
			/lat pulldown/,
			/leg press machine/,
			/calf raise/,
			/adductor/,
			/psoas raises/,
			/cable row/,
			/unilateral rear delt row/,
			/hip thrust/,
			/hamstring curl/,
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
