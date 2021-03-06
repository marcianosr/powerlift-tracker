import { FC } from "react";
import { ExcelData } from "@/pages/training/[week]/[day]";
import { render, screen, fireEvent } from "@testing-library/react";
import CurrentExercise from ".";
import { MockedDataSheetProvider } from "../../specs/MockedProviders";

const mockData: ExcelData[] = [
	{
		id: "C20",
		day: "C",
		exercise: "1) Cluster Deadlift (1MIN RI)",
		sets: 6,
		reps: "1",
		type: "barbell",
		result: {
			id: "C20",
			cellId: "A1",
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
		result: {
			id: "C21",
			cellId: "A1",
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
		result: {
			id: "C22",
			cellId: "A1",
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
		type: "not-specified",
		result: null,
	},
	{
		id: "C24",
		day: "C",
		exercise: "4) Seated hamstring Curl ",
		sets: 3,
		reps: "15-20",
		type: "not-specified",
		result: null,
	},
	{
		id: "C25",
		day: "C",
		exercise: "5) Standing Calf Raise ",
		sets: 3,
		reps: "10-12",
		type: "machine",
		result: {
			id: "C25",
			cellId: "A1",

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
		exercise: "6) Copenhagen plank",
		sets: 3,
		reps: "ALAP",
		type: "not-specified",
		result: null,
	},
];

type Props = {
	data: ExcelData[];
};

const CurrentExerciseWithProvider: FC<Props> = ({ data }) => (
	<MockedDataSheetProvider data={data} updateSheet={() => {}}>
		<CurrentExercise />
	</MockedDataSheetProvider>
);

test("renders the card data", () => {
	render(<CurrentExerciseWithProvider data={mockData} />);
	screen.getByText("1) Cluster Deadlift (1MIN RI)");
	screen.getByText("252.5");
	screen.getByText("kg");
});

test("show the finish button when there are no exercises left", async () => {
	render(
		<CurrentExerciseWithProvider
			data={mockData.slice(mockData.length - 1)}
		/>
	);

	const doneButton = screen.getByText(/Go to next/);

	fireEvent.click(doneButton);
	screen.getByText("Finish training");
});
