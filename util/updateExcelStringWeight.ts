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
	const getStoredRepsValues = values.filter(
		(_, index) => index % 2 === 1 && index
	);
	const getStoredWeightValues = values.filter(
		(_, index) => index % 2 === 0 && index - 1
	);
	const currentSetIndex = state.currentSet.count;

	const getRepsSplit = getStoredRepsValues
		.map((reps) => reps.split(","))
		.flat();

	const getStoredRepsUntil = getStoredRepsValues.slice(
		0,
		getStoredRepsValues.length - 1
	);

	const getStoredRepsAfter = getStoredRepsValues.slice(
		1,
		getStoredRepsValues.length
	);

	const hasMoreSetsThanWeights = getStoredRepsValues.length < currentSetIndex;
	const hasMoreSetsAfterCurrentSet = currentSetIndex < getRepsSplit.length;

	// ! SCENARIO 3: Replace weight with new weiught if the current set is the first index from the current weight:
	if (getStoredRepsAfter.length > 0) {
		const getStoredRepsAfterSplit = getStoredRepsAfter[0].split(",");
		const index = getStoredRepsAfterSplit.findIndex(
			(f) => f === getRepsSplit[currentSetIndex - 1]
		);

		if (index === -1 && !hasMoreSetsThanWeights) {
			const concatWeights = [
				...getStoredWeightValues
					.slice(0, currentSetIndex - 1)
					.concat(`${state.weight.toString()}kg`)
					.concat(getStoredWeightValues.slice(currentSetIndex)),
			];

			const format = concatWeights
				.map(
					(weight, idx) =>
						`${weight?.trim()} x ${getStoredRepsValues[
							idx
						]?.trim()}`
				)
				.join(" / ");

			return format;
		}

		// Weight of first set needs to be updated when index === 0 and AFTER the current weight/set are more weight with sets:
		// From 120kg x 5, 5 / 150kg x 5 / 190kg x 5 / 230kg x 5
		// To: 120kg x 5, 5 / ---> 170kg x 5 <--- / 190kg x 5 / 230kg x 5
		if (index === 0) {
			// When sets need to be updated but should also be assigned to new weight of the current set:
			// From: 120kg x 5, 5 / 170kg x 5
			// To: 120kg x 5, 5 / 170kg x 5 / --> 220kg x 5 <---
			if (hasMoreSetsThanWeights) {
				// ! Scenario 4
				const slicedOffEndRepsByCurrentSet =
					getRepsSplit.slice(currentSetIndex);
				const slicedOffStartRepsByCurrentSet = getRepsSplit.slice(
					0,
					currentSetIndex - 1
				);

				const repsForPreviousSet = getRepsSplit[currentSetIndex - 1];

				const repsFormatByNewWeight = [
					slicedOffStartRepsByCurrentSet.toString(),
					repsForPreviousSet,
					slicedOffEndRepsByCurrentSet.toString(),
				];

				const withAddedWeight = [
					...getStoredWeightValues,
					`${state.weight}kg`,
				];

				const format = withAddedWeight
					.map(
						(weight, idx) =>
							`${weight?.trim()} x ${repsFormatByNewWeight[
								idx
							]?.trim()}`
					)
					.join(" / ");

				return format;
			}

			const concatWeights = [
				...getStoredWeightValues
					.slice(0, currentSetIndex - 1)
					.concat(`${state.weight.toString()}kg`)
					.concat(getStoredWeightValues.slice(currentSetIndex)),
			];

			const format = concatWeights
				.map(
					(weight, idx) =>
						`${weight?.trim()} x ${getStoredRepsValues[
							idx
						]?.trim()}`
				)
				.join(" / ");

			return format;
		}

		if (hasMoreSetsAfterCurrentSet && index > 0) {
			const slicedOffEndRepsByCurrentSet = getRepsSplit.slice(
				currentSetIndex - 1
			);

			const repsInBetween = getRepsSplit.slice(
				-getStoredRepsAfterSplit.length,
				-slicedOffEndRepsByCurrentSet.length
			);

			const repsFormatByNewWeight = [
				getStoredRepsUntil.toString(),
				repsInBetween.toString(),
				slicedOffEndRepsByCurrentSet.toString(),
			];

			const withAddedWeight = [
				...getStoredWeightValues,
				`${state.weight}kg`,
			];

			const format = withAddedWeight
				.map(
					(weight, idx) =>
						`${weight?.trim()} x ${repsFormatByNewWeight[
							idx
						]?.trim()}`
				)
				.join(" / ");

			return format;
		}
	}

	// ! SCENARIO 2
	if (getStoredRepsUntil.length > 0) {
		const addedSetByWeight = getStoredWeightValues.concat(
			`${state.weight.toString()}kg`
		);
		const getRepsToBeSliced =
			getStoredRepsValues[getStoredWeightValues.length - 1]; // 4,3
		const remainingReps = getRepsSplit.slice(currentSetIndex - 1);

		const concatReps = [
			...getStoredRepsUntil,
			getRepsToBeSliced.split(",")[0],
			remainingReps.join(","),
		];

		const format = addedSetByWeight
			.map(
				(weight, idx) => `${weight.trim()} x ${concatReps[idx].trim()}`
			)
			.join(" / ");

		return format;
	}

	// ! REFACTOR: Scenario 1
	const repsBySet = getStoredRepsValues[0].split(",");

	const repsUntilCurrentSet = repsBySet.slice(0, state.currentSet.count - 1);
	const repsFromCurrentSet = repsBySet.slice(state.currentSet.count - 1);

	const updatedFormat = getStoredWeightValues
		.map((weight) => {
			return `${weight.trim()} x${repsUntilCurrentSet} / ${
				state.weight
			}kg x${repsFromCurrentSet}`.trim();
		})
		.toString();

	return updatedFormat;
};
