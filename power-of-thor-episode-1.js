/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = readline().split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTx = parseInt(inputs[2]); // Thor's starting X position
const initialTy = parseInt(inputs[3]); // Thor's starting Y position

let diffX = lightX - initialTx;
let diffY = lightY - initialTy;

// game loop
while (true) {
	const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
	let output;
	// Write an action using console.log()
	// To debug: console.error('Debug messages...');

	if (diffY > 0 && diffX > 0) {
		output = 'SE';
		diffY--;
		diffX--;
	} else if (diffY > 0 && diffX < 0) {
		output = 'SW';
		diffY--;
		diffX++;
	} else if (diffY > 0 && diffX == 0) {
		output = 'S';
		diffY--;
	} else if (diffY < 0 && diffX > 0) {
		output = 'NE';
		diffY++;
		diffX--;
	} else if (diffY < 0 && diffX < 0) {
		output = 'NW';
		diffY++;
		diffX++;
	} else if (diffY < 0 && diffX == 0) {
		output = 'N';
		diffY++;
	} else if (diffY == 0 && diffX > 0) {
		output = 'E';
		diffX--;
	} else if (diffY == 0 && diffX < 0) {
		output = 'W';
		diffX++;
	}

	// A single line providing the move to be made: N NE E SE S SW W or NW
	console.log(output);
}
