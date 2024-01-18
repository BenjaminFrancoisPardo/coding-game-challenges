/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);

let currentPos = [X0, Y0];
let xToSearch = [0, W - 1];
let yToSearch = [0, H - 1];

// game loop
while (true) {
	const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)

	const dichotomy = (x1, x2, y1, y2) => {
		const dx = Math.round(Math.abs(x2 - x1 + 1) / 2);
		const dy = Math.round(Math.abs(y2 - y1 + 1) / 2);

		let xf = dx + x1 - 1;
		let yf = dy + y1 - 1;

		if (x1 === x2) {
			return [x1, yf];
		} else if (y1 === y2) {
			return [xf, y1];
		} else {
			return [xf, yf];
		}
	};

	const x0 = currentPos[0];
	const y0 = currentPos[1];

	switch (bombDir) {
		case 'U':
			yToSearch[1] = y0 - 1;
			currentPos = dichotomy(x0, x0, yToSearch[0], yToSearch[1]);
			break;
		case 'UR':
			yToSearch[1] = y0 - 1;
			xToSearch[0] = x0 + 1;
			currentPos = dichotomy(
				xToSearch[0],
				xToSearch[1],
				yToSearch[0],
				yToSearch[1]
			);
			break;
		case 'R':
			xToSearch[0] = x0 + 1;
			currentPos = dichotomy(xToSearch[0], xToSearch[1], y0, y0);
			break;
		case 'DR':
			yToSearch[0] = y0 + 1;
			xToSearch[0] = x0 + 1;
			currentPos = dichotomy(
				xToSearch[0],
				xToSearch[1],
				yToSearch[0],
				yToSearch[1]
			);
			break;
		case 'D':
			yToSearch[0] = y0 + 1;
			currentPos = dichotomy(x0, x0, yToSearch[0], yToSearch[1]);
			break;
		case 'DL':
			yToSearch[0] = y0 + 1;
			xToSearch[1] = x0 - 1;
			currentPos = dichotomy(
				xToSearch[0],
				xToSearch[1],
				yToSearch[0],
				yToSearch[1]
			);
			break;
		case 'L':
			xToSearch[1] = x0 - 1;
			currentPos = dichotomy(xToSearch[0], xToSearch[1], y0, y0);
			break;
		case 'UL':
			yToSearch[1] = y0 - 1;
			xToSearch[1] = x0 - 1;
			currentPos = dichotomy(
				xToSearch[0],
				xToSearch[1],
				yToSearch[0],
				yToSearch[1]
			);
			break;
	}

	// Write an action using console.log()
	// To debug: console.error('Debug messages...');

	// the location of the next window Batman should jump to.
	console.log(`${currentPos[0]} ${currentPos[1]}`);
}
