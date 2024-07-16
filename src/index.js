import { test } from "./tests.js";

const MARKER_BYTE = 0;
const MAX_UINT8 = 255;

const serialize = (numbers) => {
	const result = [];

	numbers.forEach((num) => {
		if (num <= MAX_UINT8) {
			result.push(num);
		} else {
			result.push(MARKER_BYTE, num - MAX_UINT8);
		}
	});

	const buf = Buffer.from(result);

	return buf.toString("base64");
};

const deserialize = (string) => {
	const init = Buffer.from(string, "base64");

	const arr = [];
	for (let i = 0; i < init.length; i++) {
		if (init[i] === MARKER_BYTE) {
			i++;
			arr.push(init[i] + MAX_UINT8);
		} else {
			arr.push(init[i]);
		}
	}

	return arr;
};

test(serialize, deserialize);
