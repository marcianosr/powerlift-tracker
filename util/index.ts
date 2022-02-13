export const getExcelColumnLetterForIndex = (givenIndex: number) => {
	let weekIndexes = [givenIndex];

	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lettersArr = letters.split("");

	if (givenIndex >= lettersArr.length) {
		const alphabetLength = lettersArr.length;
		const divideByAlphabetLength = Math.floor(givenIndex / alphabetLength);

		weekIndexes = [
			Math.floor(givenIndex / alphabetLength) - 1,
			Math.floor(givenIndex - alphabetLength * divideByAlphabetLength),
		];
		const chars = [];

		for (let idx = 0; idx < weekIndexes.length; idx++) {
			chars.push(lettersArr[weekIndexes[idx]]);
		}
		return chars.join("");
	}
	return lettersArr[givenIndex];
};
