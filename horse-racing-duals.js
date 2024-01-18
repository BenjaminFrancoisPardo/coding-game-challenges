/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
let P = [];
let minDiff = 10000000;

for (let i = 0; i < N; i++) {
	P.push(parseInt(readline()));
}

P.sort((a, b) => a - b);
P.forEach((item, index) => {
	if (index > 0) {
		const diff = item - P[index - 1];
		if (diff < minDiff) {
			minDiff = diff;
		}
	}
});

console.log(minDiff);
