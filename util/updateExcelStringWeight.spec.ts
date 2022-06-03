import { formatToExcelString } from "./updateExcelStringWeight";

describe("String formatting scenario 1", () => {
	test("should update the weight of the first set and return the rep scheme in string format", () => {
		const value = "120kg x 5, 5, 5, 5";
		const parsedState = {
			cell: "J",
			weight: 210,
			currentSet: { total: 4, count: 1 },
		};

		expect(value).toBe("120kg x 5, 5, 5, 5");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("210kg x 5, 5, 5, 5");
	});
	test("should update the weight in place based on the current set, when the same weight applies over all the sets", () => {
		const value = "120kg x 5, 5, 5, 5";
		const parsedState = {
			cell: "J",
			weight: 170,
			currentSet: { total: 4, count: 2 },
		};

		expect(value).toBe("120kg x 5, 5, 5, 5");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 5 / 170kg x 5, 5, 5");
	});

	test("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 5, 5, 5, 5";
		const parsedState = {
			cell: "J",
			weight: 170,
			currentSet: { total: 4, count: 3 },
		};

		expect(value).toBe("120kg x 5, 5, 5, 5");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 5, 5 / 170kg x 5, 5");
	});

	test("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 5, 5, 5, 5";
		const parsedState = {
			cell: "J",
			weight: 170,
			currentSet: { total: 4, count: 4 },
		};

		expect(value).toBe("120kg x 5, 5, 5, 5");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 5, 5, 5 / 170kg x 5");
	});

	test("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 5, 5, 5, 5, 5, 5";
		const parsedState = {
			cell: "J",
			weight: 170,
			currentSet: { total: 6, count: 4 },
		};

		expect(value).toBe("120kg x 5, 5, 5, 5, 5, 5");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 5, 5, 5 / 170kg x 5, 5, 5");
	});
});

describe("String formatting scenario 2", () => {
	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 4, 3";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 4, count: 4 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 4, 3");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 4 / 220kg x 3");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 4, 3, 2";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 5, count: 4 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 4, 3, 2");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 4 / 220kg x 3, 2");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 4 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 4 / 220kg x 3, 2, 1");
	});
});

describe("String formatting scenario 3", () => {
	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7 / 170kg x 6, 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 2 },
		};

		expect(value).toBe("120kg x 7 / 170kg x 6, 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7 / 220kg x 6, 4, 3, 2, 1");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7 / 170kg x 6, 4 / 200kg x 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 5 },
		};

		expect(value).toBe("120kg x 7 / 170kg x 6, 4 / 200kg x 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 220kg x 2, 1"
		);
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 6 },
		};

		expect(value).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1"
		);
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2 / 220kg x 1"
		);
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 6 },
		};

		expect(value).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1"
		);
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2 / 220kg x 1"
		);
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 2 },
		};

		expect(value).toBe(
			"120kg x 7 / 170kg x 6, 4 / 200kg x 3 / 210kg x 2, 1"
		);
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 7 / 220kg x 6, 4 / 200kg x 3 / 210kg x 2, 1"
		);
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value =
			"120kg x 7 / 170kg x 6 / 195kg x 4 / 200kg x 3 / 205kg x 5 / 210kg x 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 7, count: 2 },
		};

		expect(value).toBe(
			"120kg x 7 / 170kg x 6 / 195kg x 4 / 200kg x 3 / 205kg x 5 / 210kg x 2, 1"
		);
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 7 / 220kg x 6 / 195kg x 4 / 200kg x 3 / 205kg x 5 / 210kg x 2, 1"
		);
	});
});

describe("Scenario 4", () => {
	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 3 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 4 / 220kg x 3, 2, 1");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 6, count: 4 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 4 / 220kg x 3, 2, 1");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 7, 6 / 170kg x 5, 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 7, count: 6 },
		};

		expect(value).toBe("120kg x 7, 6 / 170kg x 5, 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe("120kg x 7, 6 / 170kg x 5, 4, 3 / 220kg x 2, 1");
	});

	it("should update the weight in the right position based on the current set, when a single weight per set is given", () => {
		const value = "120kg x 8, 7 / 150kg x 6, 5 / 170kg x 4, 3, 2, 1";
		const parsedState = {
			cell: "J",
			weight: 220,
			currentSet: { total: 8, count: 6 },
		};

		expect(value).toBe("120kg x 8, 7 / 150kg x 6, 5 / 170kg x 4, 3, 2, 1");
		const updated = formatToExcelString(value, parsedState);
		expect(updated).toBe(
			"120kg x 8, 7 / 150kg x 6, 5 / 170kg x 4 / 220kg x 3, 2, 1"
		);
	});
});

describe("Scenario 5", () => {
	const mapping = [
		{
			value: "120kg x 5 / 150kg x 5, 5, 5",
			expected: "120kg x 5 / 210kg x 5, 5, 5",
			parsedState: {
				cell: "J",
				weight: 210,
				currentSet: { total: 4, count: 2 },
			},
		},
		{
			value: "120kg x 5 / 150kg x 4 / 170kg x 5, 5",
			expected: "120kg x 5 / 150kg x 4 / 210kg x 5, 5",
			parsedState: {
				cell: "J",
				weight: 210,
				currentSet: { total: 4, count: 3 },
			},
		},
		{
			value: "120kg x 6 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4",
			expected:
				"120kg x 6 / 150kg x 5 / 170kg x 5, 5 / 210kg x 5 / 190kg x 4",
			parsedState: {
				cell: "J",
				weight: 210,
				currentSet: { total: 4, count: 4 },
			},
		},
		{
			value: "120kg x 5 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4 / 200kg x 10 / 205kg x 5, 5, 5",
			expected:
				"120kg x 5 / 150kg x 5 / 170kg x 5, 5 / 180kg x 5 / 190kg x 4 / 300kg x 10 / 205kg x 5, 5, 5",
			parsedState: {
				cell: "J",
				weight: 300,
				currentSet: { total: 4, count: 6 },
			},
		},
	];

	test.each(mapping)(
		"should update the weight place based on the current set, when multiple weights per set are given",
		(mapping) => {
			expect(
				formatToExcelString(mapping.value, mapping.parsedState)
			).toBe(mapping.expected);
		}
	);
});
