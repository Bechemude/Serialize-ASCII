import * as utils from "./utils.js";
import { log } from "console";

const testCases = [
	{ name: "Простейшая последовательность (1-5)", data: [1, 2, 3, 4, 5] },
	{
		name: "Последовательность убывания (300-256)",
		data: [300, 299, 298, 256],
	},
	{ name: "Все элементы одинаковые (42)", data: Array(1000).fill(42) },
	{
		name: "Случайные числа (50)",
		data: Array.from({ length: 50 }, utils.getRandomIntLessThan300),
	},
	{
		name: "Случайные числа (100)",
		data: Array.from({ length: 100 }, utils.getRandomIntLessThan300),
	},
	{
		name: "Случайные числа (500)",
		data: Array.from({ length: 500 }, utils.getRandomIntLessThan300),
	},
	{
		name: "Случайные числа (1000)",
		data: Array.from({ length: 1000 }, utils.getRandomIntLessThan300),
	},
	{
		name: "Все однозначные числа (1000)",
		data: Array.from({ length: 1000 }, utils.getRandomOneDigitInt),
	},
	{
		name: "Все двузначные числа (1000)",
		data: Array.from({ length: 1000 }, utils.getRandomTwoDigitInt),
	},
	{
		name: "Все трехзначные числа (1000)",
		data: Array.from({ length: 1000 }, utils.getRandomThreeDigitInt),
	},
	{
		name: "Каждое число по 3 раза (всего 900 чисел)",
		data: utils.createArrayWithNumbersRepeatingThreeTimes(),
	},
];

export function test(serialize, deserialize) {
	let totalPercent = 0;
	let isAllTestsOk = true;

	for (const testCase of testCases) {
		const { name, data } = testCase;
		const serialized = serialize(data);
		const deserialized = deserialize(serialized);

		const originalLength = JSON.stringify(data).length;
		const serializedLength = JSON.stringify(serialized).length;
		const compressionRatio = serializedLength / originalLength;
		const compressionPercent = (1 - compressionRatio) * 100;

		totalPercent = totalPercent + compressionPercent;

		log(`Тестовый случай: ${name}\n`);
		log(`Исходные данные: ${data}\n`);
		log(`Сериализованные данные: ${serialized}\n`);
		log(`Коэффициент сжатия: ${compressionRatio.toFixed(2)}\n`);
		log(`Процент сжатия: ${compressionPercent.toFixed(2)}%\n`);

		let isTestOk = JSON.stringify(data) === JSON.stringify(deserialized);

		if (!isTestOk) {
			isAllTestsOk = isTestOk;
		}

		log(`Тест пройден: ${isTestOk}`);
		log("-".repeat(80));
	}

	log(
		`Средний процент сжатия: ${(totalPercent / testCases.length).toFixed(2)}%`,
	);
	log(`Все тесты пройдены: ${isAllTestsOk}`);
}
