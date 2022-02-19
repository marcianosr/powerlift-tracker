import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import range from "lodash.range";

// ? Training actually starts in column "F"
const START_ROW_OFFSET = 4;
const START_COLUMN_OFFSET = 5;
const WEEK_OFFSET = 2;

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

export const setColumnOffsetByWeek = (start: number, offset?: number) => {
	if (!offset) return start + START_ROW_OFFSET;
	return start + offset + START_ROW_OFFSET;
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
		setColumnOffsetByWeek(startWeekIndex, WEEK_OFFSET)
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

			if (!firstColumn || !secondColumn) return;

			const result =
				typeof firstColumn === "string" &&
				(typeof secondColumn === "string" ||
					typeof secondColumn === "number")
					? firstColumn
							.split(/x/)
							.map((text) => text.trim())
							.concat(secondColumn.toString())
					: [];

			const [weight, reps, RPE] = result;

			return {
				day: sheet.getCellByA1(`A${idx}`).value,
				weight,
				reps: reps.split(","),
				RPE,
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

	return rowIndexes.map((idx) => ({
		day: sheet.getCellByA1(`A${idx}`).value,
		excersise: sheet.getCellByA1(`B${idx}`).value,
		sets: sheet.getCellByA1(`C${idx}`).value,
		reps: sheet.getCellByA1(`D${idx}`).value,
	}));
};
