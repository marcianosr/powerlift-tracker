import { getExcelColumnByWeek, setColumnOffsetByWeek } from "./index";

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

test("it should skip index based on the given index", () => {
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(1, 2))).toEqual([
		"D",
		"E",
	]);
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(5, 3))).toEqual([
		"I",
		"J",
	]);
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(24, 1))).toEqual([
		"Z",
		"AA",
	]);
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(25, 3))).toEqual([
		"AC",
		"AD",
	]);
});

test("it should start at the 5th letter when no offset is given", () => {
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(1))).toEqual(["F", "G"]);
});
test("it should not skip index if no index is given", () => {
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(1))).toEqual(["F", "G"]);
	expect(getExcelColumnByWeek(setColumnOffsetByWeek(2))).toEqual(["G", "H"]);
});
