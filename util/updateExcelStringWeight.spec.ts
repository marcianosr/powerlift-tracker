import { formatToExcelString } from "./updateExcelStringWeight";

test("should update the weight and return the rep scheme in string format", () => {
	const value = "120kg x 5, 5, 5, 5";
	const parsedState = {
		cell: "J",
		weight: 210,
		currentSet: { total: 4, count: 1 },
	};

	expect(value).toBe("120kg x 5, 5, 5, 5");
	const updated = formatToExcelString(value, parsedState);
	expect(updated).toBe("210kg x 5, 5, 5, 5");
});

const mapping = [
	{
		value: "120kg x 5 / 150kg x 5, 5, 5",
		expected: "120kg x 5 / 210kg x 5, 5, 5",
		parsedState: {
			cell: "J",
			weight: 210,
			currentSet: { total: 4, count: 2 },
		},
	},
	{
		value: "120kg x 5 / 150kg x 4 / 170kg x 5, 5",
		expected: "120kg x 5 / 150kg x 4 / 210kg x 5, 5",
		parsedState: {
			cell: "J",
			weight: 210,
			currentSet: { total: 4, count: 3 },
		},
	},
	{
		value: "120kg x 6 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4",
		expected:
			"120kg x 6 / 150kg x 5 / 170kg x 5, 5 / 210kg x 5 / 190kg x 4",
		parsedState: {
			cell: "J",
			weight: 210,
			currentSet: { total: 4, count: 4 },
		},
	},
	{
		value: "120kg x 5 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4 / 200kg x 10 / 205kg x 5, 5, 5",
		expected:
			"120kg x 5 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4 / 300kg x 10 / 205kg x 5, 5, 5",
		parsedState: {
			cell: "J",
			weight: 300,
			currentSet: { total: 4, count: 6 },
		},
	},
];

test.each(mapping)(
	"should update the weight in the right position based on the current set",
	(mapping) => {
		expect(formatToExcelString(mapping.value, mapping.parsedState)).toBe(
			mapping.expected
		);
	}
);
