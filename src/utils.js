export function getRandomIntLessThan300() {
	return Math.floor(Math.random() * 299) + 1;
}

export function getRandomOneDigitInt() {
	return Math.floor(Math.random() * 9) + 1;
}

export function getRandomTwoDigitInt() {
	return Math.floor(Math.random() * 90) + 10;
}

export function getRandomThreeDigitInt() {
	return Math.floor(Math.random() * 200) + 100;
}

export function createArrayWithNumbersRepeatingThreeTimes() {
	const numbers = [];

	for (let i = 1; i <= 299; i++) {
		const number = getRandomIntLessThan300();
		numbers.push(number, number, number);
	}

	return numbers;
}
