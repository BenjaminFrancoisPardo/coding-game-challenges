/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline()); // the number of temperatures to analyse
var inputs = readline().split(' ');
let init = [];

for (let i = 0; i < n; i++) {
	const t = parseInt(inputs[i]); // a temperature expressed as an integer ranging from -273 to 5526
	init.push(t);
}

let posArray = [];
let negArray = [];

const findClosestToZero = (array) => {
	let found = false;
	if (!array.length) {
		found = true;
	} else {
		array.forEach((value, index) => {
			if (value > 0) {
				posArray.push(value);
			} else if (value < 0) {
				negArray.push(value);
			} else {
				found = true;
			}
		});
	}
	if (found) {
		return 0;
	} else {
		minPos = findSmallest(posArray);
		minNeg = findSmallest(negArray.map((x) => Math.abs(x)));
		console.error(minPos);
		console.error(minNeg);
		return minPos <= minNeg ? minPos : minNeg * -1;
	}
};

const findSmallest = (array) => {
	return Math.min(...array);
};

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(findClosestToZero(init));
