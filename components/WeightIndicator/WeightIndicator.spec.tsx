import { render, screen } from "@testing-library/react";
import WeightIndicator from ".";
import { divideWeightForPlates } from "./utils";

// ! Tip: Weights are MINUS bar weight!! ⚠️
const mockData = [
	{
		weight: 190,
		expected: [20, 25, 25, 25],
		plates: ["plate-20", "plate-25", "plate-25", "plate-25"],
	},
	{
		weight: 195,
		expected: [2.5, 20, 25, 25, 25],
		plates: ["plate-2.5", "plate-20", "plate-25", "plate-25", "plate-25"],
	},
	{
		weight: 192.5,
		expected: [1.25, 20, 25, 25, 25],
		plates: ["plate-1.25", "plate-20", "plate-25", "plate-25", "plate-25"],
	},
	{
		weight: 197.5,
		expected: [1.25, 2.5, 20, 25, 25, 25],
		plates: [
			"plate-1.25",
			"plate-2.5",
			"plate-20",
			"plate-25",
			"plate-25",
			"plate-25",
		],
	},
	{
		weight: 100,
		expected: [25, 25],
		plates: ["plate-25", "plate-25"],
	},
	{
		weight: 50,
		expected: [25],
		plates: ["plate-25"],
	},
	{
		weight: 70,
		expected: [10, 25],
		plates: ["plate-10", "plate-25"],
	},
	{
		weight: 30,
		expected: [15],
		plates: ["plate-15"],
	},
	{
		weight: 77.5,
		expected: [1.25, 2.5, 10, 25],
		plates: ["plate-1.25", "plate-2.5", "plate-25"],
	},
	{
		weight: 127.5,
		expected: [1.25, 2.5, 10, 25, 25],
		plates: ["plate-1.25", "plate-2.5", "plate-25", "plate-25"],
	},
	{
		weight: 217.5,
		expected: [1.25, 2.5, 5, 25, 25, 25, 25],
		plates: [
			"plate-1.25",
			"plate-2.5",
			"plate-5",
			"plate-25",
			"plate-25",
			"plate-25",
			"plate-25",
		],
	},
];

test.each(mockData)(
	"it should calculate the $expected amount of plates needed based on the given weight: $weight",
	(mockData) => {
		const result = divideWeightForPlates(mockData.weight, []);

		expect(mockData.expected).toEqual(result);
	}
);

test.each(mockData)(
	"it shows the given plates by the given numbers $plates",
	(mockData) => {
		render(
			<WeightIndicator
				size="small"
				weights={divideWeightForPlates(mockData.weight)}
			/>
		);

		mockData.plates.forEach((plate) => screen.getAllByTestId(`${plate}`));

		expect(screen.queryByTestId("plate-35")).not.toBeInTheDocument(); // 35kg plates don't exist
	}
);
