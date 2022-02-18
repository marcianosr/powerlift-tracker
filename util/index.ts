import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import range from "lodash.range";

const START_OFFSET = 5;

export const getExcelColumnLetterForIndex = (givenIndex: number) => {
	let weekIndexes = [givenIndex];

	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lettersArr = letters.split("");

	// Refactor later?
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

export const getColumnByLetter = async (
	sheet: GoogleSpreadsheetWorksheet,
	letter: string | undefined | string[]
) => {
	const totalRowLength = (await sheet.getRows()).length;
	const queryLetter = letter?.toString().toUpperCase();

	await sheet.loadCells(
		`${queryLetter}${START_OFFSET}:${queryLetter}${totalRowLength}`
	);

	const rowIndexes = range(START_OFFSET, totalRowLength);

	return rowIndexes
		.map((idx) => {
			const columnValue = sheet.getCellByA1(`${queryLetter}${idx}`).value;
			const result =
				typeof columnValue === "string" &&
				columnValue.split(/x/).map((text) => text.trim());

			return {
				data: result,
			};
		})
		.filter((item) => item.data);
};

export const getBasicProgramInfo = async (
	sheet: GoogleSpreadsheetWorksheet
) => {
	const totalRowLength = (await sheet.getRows()).length;

	await sheet.loadCells(`A${START_OFFSET}:D${totalRowLength}`);

	const rowIndexes = range(START_OFFSET, totalRowLength);

	return rowIndexes.map((idx) => ({
		day: sheet.getCellByA1(`A${idx}`).value,
		excersise: sheet.getCellByA1(`B${idx}`).value,
		sets: sheet.getCellByA1(`C${idx}`).value,
		reps: sheet.getCellByA1(`D${idx}`).value,
	}));
};
