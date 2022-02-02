export const parseCSV = (data: string[]) => {
	const startIndex = data.findIndex((a) => a === "A");
	const newData = data.slice(startIndex);

	const dayA = newData
		.map((element: string, index: number) =>
			sliceTrainingByDay(newData, element, index, "A")
		)
		.filter((item) => item !== undefined);

	const dayB = newData
		.map((element: string, index: number) =>
			sliceTrainingByDay(newData, element, index, "B")
		)
		.filter((item) => item !== undefined);

	const dayC = newData
		.map((element: string, index: number) =>
			sliceTrainingByDay(newData, element, index, "C")
		)
		.filter((item) => item !== undefined);

	const dayD = newData
		.map((element: string, index: number) =>
			sliceTrainingByDay(newData, element, index, "D")
		)
		.filter((item) => item !== undefined);

	const result = { dayA, dayB, dayC, dayD };

	return result;
};

const sliceTrainingByDay = (
	data: string[],
	element: string,
	index: number,
	char: string
) => {
	if (element === char) {
		const records = [];

		const startFrom = data
			.slice(1)
			.findIndex((element: string) => element === "A");

		records.push(
			data.map((text) => text.trim()).slice(1 + index, startFrom + index)
		);

		const result = records.flat();

		return result;
	}
};
