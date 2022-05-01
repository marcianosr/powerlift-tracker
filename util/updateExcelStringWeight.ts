export const formatToExcelString = (value: string, state: any) => {
	const isFirstSet = state.currentSet.count > 1;

	if (!isFirstSet) {
		const [_, reps] = String(value).split(/x|\//gi);
		const updatedFormat = [`${state.weight}kg x`, reps].join("").toString();

		return updatedFormat;
	}

	const values = String(value).split(/x|\//gi);
	return updateExcelStringWeight(values, state);
};

const updateExcelStringWeight = (values: string[], state: any) => {
	const getRepsValues = values.filter((_, index) => index % 2 === 1 && index);
	const getWeightValues = values.filter(
		(_, index) => index % 2 === 0 && index - 1
	);

	getWeightValues[state.currentSet.count - 1] = `${state.weight}kg`;

	const updatedFomat = getWeightValues
		.map((weight, idx) =>
			`${weight.trim()} x ${getRepsValues[idx].trim()}`.trim()
		)
		.join(" / ");

	return updatedFomat;
};
