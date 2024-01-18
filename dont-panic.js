/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const nbFloors = parseInt(inputs[0]); // number of floors
const width = parseInt(inputs[1]); // width of the area
const nbRounds = parseInt(inputs[2]); // maximum number of rounds
const exitFloor = parseInt(inputs[3]); // floor on which the exit is found
const exitPos = parseInt(inputs[4]); // position of the exit on its floor
const nbTotalClones = parseInt(inputs[5]); // number of generated clones
const nbAdditionalElevators = parseInt(inputs[6]); // ignore (always zero)
const nbElevators = parseInt(inputs[7]); // number of elevators

let elevatorArray = [];

for (let i = 0; i < nbElevators; i++) {
	var inputs = readline().split(' ');
	const elevatorFloor = parseInt(inputs[0]); // floor on which this elevator is found
	const elevatorPos = parseInt(inputs[1]); // position of the elevator on its floor
	elevatorArray.push([elevatorFloor, elevatorPos]);
}

const findElevatorPos = (cloneFloor, elevatorArray) => {
	const coordElevator = elevatorArray.find(
		(elevator) => elevator[0] == cloneFloor
	)[1];
	return coordElevator;
};

const findObjectiveDirection = (clonePos, objectivePos) => {
	const diff = clonePos - objectivePos;
	if (diff == 0) {
		return 0;
	}
	return diff > 0 ? 'LEFT' : 'RIGHT';
};

const findNextAction = (cloneFloor, clonePos, direction, elevatorArray) => {
	if (cloneFloor < 0) {
		return 'WAIT';
	}
	if (!(cloneFloor == exitFloor)) {
		const elevatorPos = findElevatorPos(cloneFloor, elevatorArray);
		console.error(elevatorPos);
		const bestDirection = findObjectiveDirection(clonePos, elevatorPos);
		console.error(bestDirection);
		if (!bestDirection) {
			return 'WAIT';
		}
		if (!(direction == bestDirection)) {
			return 'BLOCK';
		}
		return 'WAIT';
	}
	if (cloneFloor == exitFloor) {
		const bestDirection = findObjectiveDirection(clonePos, exitPos);
		if (direction == bestDirection) {
			return 'WAIT';
		}
		return 'BLOCK';
	}
};

// game loop
while (true) {
	var inputs = readline().split(' ');
	const cloneFloor = parseInt(inputs[0]); // floor of the leading clone
	const clonePos = parseInt(inputs[1]); // position of the leading clone on its floor
	const direction = inputs[2]; // direction of the leading clone: LEFT or RIGHT

	// Write an action using console.log()
	// To debug: console.error('Debug messages...');

	const output = findNextAction(cloneFloor, clonePos, direction, elevatorArray);

	console.log(output); // action: WAIT or BLOCK
}
