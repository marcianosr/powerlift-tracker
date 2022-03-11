import { exerciseForType } from "./exerciseForType";

const mapping = [
	{
		input: "1) Low Bar Squat 'Single'",
		expected: {
			exercise: "1) Low Bar Squat 'Single'",
			type: "barbell",
		},
	},
	{
		input: "Low Bar Squat 'Top-Set'",
		expected: {
			exercise: "Low Bar Squat 'Top-Set'",
			type: "barbell",
		},
	},
	{
		input: "2) Volume Deadlift",
		expected: {
			exercise: "2) Volume Deadlift",
			type: "barbell",
		},
	},
	{
		input: "3) Front Foot Elevated DB Split Squat",
		expected: {
			exercise: "3) Front Foot Elevated DB Split Squat",
			type: "dumbell",
		},
	},
	{
		input: "4) Standing Calf Raise (2 sec top paused  & 2bodem)",
		expected: {
			exercise: "4) Standing Calf Raise (2 sec top paused  & 2bodem)",
			type: "machine",
		},
	},
	{
		input: "1) Competition Bench Press 'single'",
		expected: {
			exercise: "1) Competition Bench Press 'single'",
			type: "barbell",
		},
	},
	{
		input: "1) Competition Bench Press 'single'",
		expected: {
			exercise: "1) Competition Bench Press 'single'",
			type: "barbell",
		},
	},
	{
		input: "3) Press Around",
		expected: {
			exercise: "3) Press Around",
			type: "machine",
		},
	},
	{
		input: "4) Unilateral Lat Pulldown",
		expected: {
			exercise: "4) Unilateral Lat Pulldown",
			type: "machine",
		},
	},
	{
		input: "1) Cluster Deadlift (1MIN RI)",
		expected: {
			exercise: "1) Cluster Deadlift (1MIN RI)",
			type: "barbell",
		},
	},
	{
		input: "Deadlift Volume",
		expected: {
			exercise: "Deadlift Volume",
			type: "barbell",
		},
	},
	{
		input: "2) Paused High Bar Squat",
		expected: {
			exercise: "2) Paused High Bar Squat",
			type: "barbell",
		},
	},
	{
		input: "5) Standing Calf Raise",
		expected: {
			exercise: "5) Standing Calf Raise",
			type: "machine",
		},
	},
	{
		input: "Leg Extension",
		expected: {
			exercise: "Leg Extension",
			type: "machine",
		},
	},
];

test.each(mapping)("should return a type per exercise", (mapping) => {
	expect(exerciseForType(mapping.input)).toEqual(mapping.expected);
});
