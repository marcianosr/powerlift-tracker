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
