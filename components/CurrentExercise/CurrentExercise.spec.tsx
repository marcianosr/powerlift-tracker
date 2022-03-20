import { ExcelData } from "@/pages/training/[week]/[day]";
import { render } from "@testing-library/react";
import CurrentExercise from ".";

const mockData: ExcelData[] = [
	{
		id: "C20",
		day: "C",
		exercise: "1) Cluster Deadlift (1MIN RI)",
		sets: 6,
		reps: "1",
		type: "barbell",
		plan: {
			id: "C20",
			day: "C",
			weight: 252.5,
			unit: "kg",
			reps: ["1 / 265kg"],
			RPE: "9",
		},
	},
	{
		id: "C21",
		day: "C",
		exercise: "    Deadlift Volume ",
		sets: 2,
		reps: "4",
		type: "barbell",
		plan: {
			id: "C21",
			day: "C",
			weight: 227.5,
			unit: "kg",
			reps: ["1", " 1 (2"],
			RPE: "7.5",
		},
	},
	{
		id: "C22",
		day: "C",
		exercise: "2) Paused High Bar Squat ",
		sets: 3,
		reps: "5",
		type: "barbell",
		plan: {
			id: "C22",
			day: "C",
			weight: 165,
			unit: "kg",
			reps: ["5", " 5", " 5"],
			RPE: "8.5",
		},
	},
	{
		id: "C23",
		day: "C",
		exercise: "3) Hip Thrust machine ",
		sets: 3,
		reps: "10-12",
		type: "no-type",
		plan: null,
	},
	{
		id: "C24",
		day: "C",
		exercise: "4) Seated hamstring Curl ",
		sets: 3,
		reps: "15-20",
		type: "no-type",
		plan: null,
	},
	{
		id: "C25",
		day: "C",
		exercise: "5) Standing Calf Raise ",
		sets: 3,
		reps: "10-12",
		type: "machine",
		plan: {
			id: "C25",
			day: "C",
			weight: "Stand 13",
			unit: "unknown",
			reps: ["12", " 12", " 12"],
			RPE: "8.5",
		},
	},
	{
		id: "C26",
		day: "C",
		exercise: "6) Copenhagen Plank",
		sets: 3,
		reps: "ALAP",
		type: "no-type",
		plan: null,
	},
];

test("renders the card data", () => {
	const { asFragment } = render(<CurrentExercise data={mockData} />);

	expect(asFragment()).toMatchSnapshot();
});
