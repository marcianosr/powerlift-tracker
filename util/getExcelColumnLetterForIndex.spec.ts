import { getExcelColumnLetterForIndex } from "./index";

const mapping = [
	{
		expected: ["A", "B"],
		index: 0,
	},
	{
		expected: ["B", "C"],
		index: 1,
	},
	{
		expected: ["C", "D"],
		index: 2,
	},
	{
		expected: ["Z", "AA"],
		index: 25,
	},
	{
		expected: ["AA", "AB"],
		index: 26,
	},
	{
		expected: ["AB", "AC"],
		index: 27,
	},
	{
		expected: ["BX", "BY"],
		index: 75,
	},
	{
		expected: ["BY", "BZ"],
		index: 76,
	},
	{
		expected: ["BZ", "CA"],
		index: 77,
	},
	{
		expected: ["CA", "CB"],
		index: 78,
	},
	{
		expected: ["CB", "CC"],
		index: 79,
	},
	{
		expected: ["CZ", "DA"],
		index: 103,
	},
	{
		expected: ["DC", "DD"],
		index: 106,
	},
];
test.each(mapping)(
	"column letter $expected to match the given index $index",
	(mapping) => {
		expect(getExcelColumnLetterForIndex(mapping.index)).toEqual(
			mapping.expected
		);
	}
);
