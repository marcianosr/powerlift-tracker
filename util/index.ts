import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import range from "lodash.range";
import { exerciseForType } from "./exerciseForType";

// ? Training actually starts in column "F"
export const START_ROW_OFFSET = 4;
export const START_COLUMN_OFFSET = 5;

export const getExcelColumnByWeek = (givenIndex: number) => {
	let weekIndexes = [givenIndex];

	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lettersArr = letters.split("");

	// TODO: Refactor later
	if (givenIndex === lettersArr.length - 1) {
		return [lettersArr[givenIndex], "AA"];
	}

	if (givenIndex >= lettersArr.length) {
		const alphabetLength = lettersArr.length;
		const divideByAlphabetLength = Math.floor(givenIndex / alphabetLength);
		const firstLetterIndex = Math.floor(givenIndex / alphabetLength) - 1;
		const secondLetterIndex = Math.floor(
			givenIndex - alphabetLength * divideByAlphabetLength
		);

		weekIndexes = [
			firstLetterIndex,
			secondLetterIndex,
			secondLetterIndex === alphabetLength - 1
				? firstLetterIndex + 1
				: firstLetterIndex,
			secondLetterIndex === alphabetLength - 1
				? 0
				: secondLetterIndex + 1,
		];

		const chars = [];

		for (let idx = 0; idx < weekIndexes.length; idx++) {
			chars.push(lettersArr[weekIndexes[idx]]);
		}

		const newChars = [chars.slice(0, 2).join(""), chars.slice(2).join("")];

		return newChars;
	}

	return [lettersArr[givenIndex], lettersArr[givenIndex + 1]];
};

export const generateIndexForColumn = (current: number) => {
	if (current === 1) return 1;
	let sum = 0;

	for (let i = 1; i < current; i++) {
		sum = current + i;
	}
	return sum;
};

export const loadColumnDataByLetter = async (
	sheet: GoogleSpreadsheetWorksheet,
	weekIndexFromQuery: string | string[] | undefined
) => {
	const totalRowLength = (await sheet.getRows()).length;

	if (!weekIndexFromQuery)
		throw new Error("Week index is not given or found");

	const startWeekIndex = +weekIndexFromQuery || 0;

	const excelColumnForWeek = getExcelColumnByWeek(
		generateIndexForColumn(startWeekIndex) + START_ROW_OFFSET
	);

	await sheet.loadCells(
		`${excelColumnForWeek[0]}${START_COLUMN_OFFSET}:${excelColumnForWeek[1]}${totalRowLength}`
	);

	const rowIndexes = range(START_COLUMN_OFFSET, totalRowLength + 1); // ? Somehow needed to add + 1 because it ended at 32 iso 33?

	return rowIndexes
		.map((idx) => {
			const firstColumn = sheet.getCellByA1(
				`${excelColumnForWeek[0]}${idx}`
			).value;

			const secondColumn = sheet.getCellByA1(
				`${excelColumnForWeek[1]}${idx}`
			).value;

			// firstColumn should be exercises column
			// secondColumn should be RPE column
			if (!firstColumn) return;

			const parsedExcelData =
				typeof firstColumn === "string"
					? firstColumn.split(/x/).map((text) => text.trim())
					: [];

			const result = parsedExcelData.filter(Boolean);
			const RPE =
				typeof secondColumn === "string" ||
				typeof secondColumn === "number"
					? secondColumn
					: null;

			const extractedComment = result.filter(
				(r) => r.startsWith("(") && r
			);

			const weight = result[0].split("kg")[0];
			const decimalWeight =
				weight.includes(",") && weight.replace(",", ".");
			const hasKGUnit = result[0].includes("kg");

			return {
				id: `${sheet.getCellByA1(`A${idx}`).value}${idx}`,
				day: sheet.getCellByA1(`A${idx}`).value,
				weight: +decimalWeight || +weight || result[0], // ! kg weights or "BW" or "Stand .."
				...(hasKGUnit ? { unit: "kg" } : { unit: "unknown" }),
				reps: result[1].split(","),
				RPE,
				comment: extractedComment.length > 0 && extractedComment,
			};
		})
		.filter(Boolean);
};

export const getBasicProgramInfo = async (
	sheet: GoogleSpreadsheetWorksheet
) => {
	const totalRowLength = (await sheet.getRows()).length;

	await sheet.loadCells(`A${START_ROW_OFFSET}:D${totalRowLength}`);

	const rowIndexes = range(START_ROW_OFFSET, totalRowLength);

	return rowIndexes.map((idx) => {
		return {
			id: `${sheet.getCellByA1(`A${idx}`).value}${idx}`,
			day: sheet.getCellByA1(`A${idx}`).value,
			exercise: sheet.getCellByA1(`B${idx}`).value,
			sets: sheet.getCellByA1(`C${idx}`).value,
			reps: sheet.getCellByA1(`D${idx}`).value
				? sheet.getCellByA1(`D${idx}`).value.toString().split(" ")[0]
				: null,
			type: !sheet.getCellByA1(`B${idx}`).value
				? ""
				: exerciseForType(sheet.getCellByA1(`B${idx}`).value.toString())
						.type, // ! Can be any type from the excel, however strings are the only ones needed. Not to be confused with "type" from exercise
		};
	});
};
