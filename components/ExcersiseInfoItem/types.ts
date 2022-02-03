export type ExceriseInfoItems = {
	excersise: string;
	sets: string;
	reps: string;
	weight: string;
	RPE: string;
	previous: Pick<ExceriseInfoItems, "RPE" | "weight">;
};
