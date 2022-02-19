import {
	getExcelColumnByWeek,
	generateIndexForColumn,
	START_ROW_OFFSET,
} from "./index";

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
		expected: ["N", "O"],
		index: 13,
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
		expect(getExcelColumnByWeek(mapping.index)).toEqual(mapping.expected);
	}
);

test("generateIndexForColumn", () => {
	expect(generateIndexForColumn(1)).toBe(1);
	expect(generateIndexForColumn(2)).toBe(3);
	expect(generateIndexForColumn(3)).toBe(5);
	expect(generateIndexForColumn(4)).toBe(7);
	expect(generateIndexForColumn(5)).toBe(9);
	expect(generateIndexForColumn(6)).toBe(11);
	expect(generateIndexForColumn(7)).toBe(13);
	expect(generateIndexForColumn(8)).toBe(15);
	expect(generateIndexForColumn(9)).toBe(17);
});

test("each column letter based on week index", () => {
	expect(
		getExcelColumnByWeek(generateIndexForColumn(1) + START_ROW_OFFSET)
	).toEqual(["F", "G"]);
	expect(
		getExcelColumnByWeek(generateIndexForColumn(2) + START_ROW_OFFSET)
	).toEqual(["H", "I"]);
	expect(
		getExcelColumnByWeek(generateIndexForColumn(3) + START_ROW_OFFSET)
	).toEqual(["J", "K"]);
	expect(
		getExcelColumnByWeek(generateIndexForColumn(4) + START_ROW_OFFSET)
	).toEqual(["L", "M"]);
});
