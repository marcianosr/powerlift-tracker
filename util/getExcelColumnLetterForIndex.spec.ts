import { getExcelColumnLetterForIndex } from "./index";

const mapping = [
	{
		expected: "A",
		index: 0,
	},
	{
		expected: "B",
		index: 1,
	},
	{
		expected: "C",
		index: 2,
	},
	{
		expected: "Z",
		index: 25,
	},
	{
		expected: "AA",
		index: 26,
	},
	{
		expected: "AB",
		index: 27,
	},
	{
		expected: "BX",
		index: 75,
	},
	{
		expected: "BY",
		index: 76,
	},
	{
		expected: "BZ",
		index: 77,
	},
	{
		expected: "CA",
		index: 78,
	},
	{
		expected: "CB",
		index: 79,
	},
	{
		expected: "CC",
		index: 80,
	},
	{
		expected: "DC",
		index: 106,
	},
];
test.each(mapping)(
	"column letter $expected to match the given index $index",
	(mapping) => {
		expect(getExcelColumnLetterForIndex(mapping.index)).toBe(
			mapping.expected
		);
	}
);
