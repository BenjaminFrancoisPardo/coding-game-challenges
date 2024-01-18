/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis

let grid = [];
for (let i = 0; i < height; i++) {
	const line = readline(); // width characters, each either 0 or .
	grid.push(line);
}

let output = [];

grid.forEach((line, lineIndex) => {
	for (let charIndex = 0; charIndex < line.length; charIndex++) {
		if (line[charIndex] == 0) {
			const node = [charIndex, lineIndex];
			let right;
			let down;
			let i = 1;
			let j = 1;
			let foundRight = false;
			let foundDown = false;
			while (!foundRight && charIndex + i < line.length) {
				if (grid[lineIndex][charIndex + i] == 0) {
					right = [charIndex + i, lineIndex];
					foundRight = true;
				}
				i++;
			}
			if (!foundRight) {
				right = [-1, -1];
			}

			while (!foundDown && lineIndex + j < grid.length) {
				if (grid[lineIndex + j][charIndex] == 0) {
					down = [charIndex, lineIndex + j];
					foundDown = true;
				}
				j++;
			}

			if (!foundDown) {
				down = [-1, -1];
			}

			output.push(node.concat(right, down));
		}
	}
});

// Write an action using console.log()
// To debug: console.error('Debug messages...');

// Three coordinates: a node, its right neighbor, its bottom neighbor
output.forEach((line) => {
	console.log(line.join(' '));
});
