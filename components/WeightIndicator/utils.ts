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
