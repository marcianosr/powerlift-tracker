import { PlateNumbers } from ".";

enum Plates {
	Red = 25,
	Blue = 20,
	Yellow = 15,
	Green = 10,
	White = 5,
	Black = 2.5,
	Gray = 1.25,
	Silver = 0.5,
}

export enum Bars {
	Olympic = 20,
	EZ = 10,
}

export const divideWeightForPlates = (
	weight: number,
	weights: PlateNumbers[] = []
): PlateNumbers[] => {
	if (weight === 0) return weights;
	const redPlatesTimesTwo = Plates.Red * 2;

	if (weight < redPlatesTimesTwo) {
		const isMultipleOfTen = weight % 10 === 0;

		const nearestTen =
			(!isMultipleOfTen && Math.floor(weight / 10) * 10) || 0;

		if (nearestTen === 0)
			return [...weights, weight / 2].sort() as PlateNumbers[];

		const belowTen = weight - nearestTen;

		if (belowTen === 7.5)
			return [
				...weights,
				(weight - belowTen) / 2,
				belowTen / 3, // 2.5
				belowTen / 3 / 2, // 1.25
			].sort((a, b) => a - b) as PlateNumbers[]; // Compare func. is required: https://www.w3schools.com/jsref/jsref_sort.asp

		return [
			...weights,
			weight / 2 - belowTen / 2,
			belowTen / 2,
		].sort() as PlateNumbers[];
	}

	return divideWeightForPlates(weight - redPlatesTimesTwo, [
		...weights,
		Plates.Red,
	]);
};
