/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
const directionsToFinishGame = [];

let previousMove;

// game loop
while (true) {
	var inputs = readline().split(' ');
	const KR = parseInt(inputs[0]); // row where Rick is located.
	const KC = parseInt(inputs[1]); // column where Rick is located.
	const grid = [];

	for (let i = 0; i < R; i++) {
		const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).

		grid.push(ROW);
	}

	if (directionsToFinishGame.length) {
		console.log(directionsToFinishGame.shift());
		continue;
	}

	if (exists2DAdjacent(grid, '.', '?')) {
		previousMove = exploreMap(grid, KR, KC, previousMove);
	} else if (exists2D(grid, 'C')) {
		const targetCoord = findIndex2D(grid, 'C');
		const nodeList = runAStar(grid, KR, KC, targetCoord[0], targetCoord[1]);

		if (nodeList.length > 0) {
			const homeCoord = findIndex2D(grid, 'T');
			const nodeListToHome = runAStar(
				grid,
				targetCoord[0],
				targetCoord[1],
				homeCoord[0],
				homeCoord[1]
			);
			directionsToFinishGame.push(
				...findPathForwards(nodeList),
				...findPathForwards(nodeListToHome)
			);

			console.log(directionsToFinishGame.shift());
		} else {
			previousMove = exploreMap(grid, KR, KC, previousMove);
		}
	}
}

function findIndex2D(grid, searched) {
	let coord = [-1, -1];

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == searched) {
				coord[0] = i;
				coord[1] = j;
				return coord;
			}
		}
	}

	return coord;
}

function exists2D(grid, searched) {
	return grid.some((row) => row.includes(searched));
}

function exists2DAdjacent(grid, searchedPref, searchedAdj) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (
				i === 0 ||
				i === grid.length - 1 ||
				j === 0 ||
				j === grid[i].length - 1
			) {
				continue;
			}

			if (
				grid[i][j] === searchedPref &&
				(grid[i + 1][j] === searchedAdj ||
					grid[i - 1][j] === searchedAdj ||
					grid[i][j + 1] === searchedAdj ||
					grid[i][j - 1] === searchedAdj)
			) {
				return true;
			}
		}
	}

	return false;
}

function exploreMap(grid, KR, KC, previousMove) {
	const allowedMoves = getAllowedMoves(grid, KR, KC, 'C');
	const templateMoves = [];

	let nextMove;

	if (!previousMove) {
		nextMove = allowedMoves[0];
	} else {
		switch (previousMove) {
			case 'UP':
				templateMoves.push('RIGHT', 'UP', 'LEFT', 'DOWN');
				break;
			case 'DOWN':
				templateMoves.push('LEFT', 'DOWN', 'RIGHT', 'UP');
				break;
			case 'RIGHT':
				templateMoves.push('DOWN', 'RIGHT', 'UP', 'LEFT');
				break;
			case 'LEFT':
				templateMoves.push('UP', 'LEFT', 'DOWN', 'RIGHT');
				break;
		}

		const nextMoves = templateMoves.filter((move) =>
			allowedMoves.includes(move)
		);

		nextMove = nextMoves[0];
	}

	console.log(nextMove);

	return nextMove;
}

function getAllowedMoves(grid, KR, KC, extraForbidden) {
	const basicMoves = ['UP', 'LEFT', 'DOWN', 'RIGHT'];
	const forbiddenMoves = [];

	if (
		KR < grid.length &&
		(grid[KR + 1][KC] === '#' || grid[KR + 1][KC] === extraForbidden)
	) {
		forbiddenMoves.push('DOWN');
	}

	if (
		KR > 0 &&
		(grid[KR - 1][KC] === '#' || grid[KR - 1][KC] === extraForbidden)
	) {
		forbiddenMoves.push('UP');
	}

	if (
		KC < grid[0].length &&
		(grid[KR][KC + 1] === '#' || grid[KR][KC + 1] === extraForbidden)
	) {
		forbiddenMoves.push('RIGHT');
	}

	if (
		KC > 0 &&
		(grid[KR][KC - 1] === '#' || grid[KR][KC - 1] === extraForbidden)
	) {
		forbiddenMoves.push('LEFT');
	}

	return basicMoves.filter((move) => !forbiddenMoves.includes(move));
}

function runAStar(grid, startR, startC, targetR, targetC) {
	const start = {
		row: startR,
		col: startC,
		cost: 0,
		heuristic: Math.abs(startR - targetR) + Math.abs(startC - targetC),
		previousNodeIndex: null,
	};
	const closedList = [];
	const openList = [start];

	while (openList.length > 0) {
		const current = openList[0];

		if (current.row === targetR && current.col === targetC) {
			closedList.push(current);

			return closedList;
		}

		openList.shift();

		const allowedMoves = getAllowedMoves(grid, current.row, current.col, '?');
		const neighbours = allowedMoves.map((move) => {
			const rowIndex =
				move === 'UP'
					? current.row - 1
					: move === 'DOWN'
					? current.row + 1
					: current.row;
			const colIndex =
				move === 'RIGHT'
					? current.col + 1
					: move === 'LEFT'
					? current.col - 1
					: current.col;

			return {
				row: rowIndex,
				col: colIndex,
				cost: current.cost + 1,
				heuristic:
					current.cost +
					1 +
					Math.abs(targetR - rowIndex) +
					Math.abs(targetC - colIndex),
				previousNodeIndex: closedList.length,
			};
		});
		const newNeighbours = neighbours
			.filter((node) => !includesNode(closedList, node))
			.filter((node) => !includesSameNodeSmallerHeuristic(openList, node));

		closedList.push(current);
		openList.push(...newNeighbours);
		openList.sort(compareHeuristic);
	}

	return [];
}

function findPathForwards(nodeList) {
	return findPathBackwards(nodeList)
		.reverse()
		.map((direction) => {
			switch (direction) {
				case 'UP':
					return 'DOWN';
				case 'DOWN':
					return 'UP';
				case 'RIGHT':
					return 'LEFT';
				case 'LEFT':
					return 'RIGHT';
			}
		});
}

function findPathBackwards(nodeList) {
	const directions = [];

	let isPathComplete = false;
	let currentNodeIndex = nodeList.length - 1;

	while (!isPathComplete) {
		const currentNode = nodeList[currentNodeIndex];

		let nextDirection;

		currentNodeIndex = currentNode.previousNodeIndex;

		const nextNode = nodeList[currentNodeIndex];

		if (currentNode.row - nextNode.row === -1) {
			nextDirection = 'DOWN';
		} else if (currentNode.row - nextNode.row === 1) {
			nextDirection = 'UP';
		} else if (currentNode.col - nextNode.col === -1) {
			nextDirection = 'RIGHT';
		} else {
			nextDirection = 'LEFT';
		}

		directions.push(nextDirection);
		isPathComplete = nextNode.cost === 0;
	}

	return directions;
}

function includesNode(list, searchedNode) {
	return list.reduce((accumulator, currentNode) => {
		return (
			accumulator ||
			(currentNode.row === searchedNode.row &&
				currentNode.col === searchedNode.col)
		);
	}, false);
}

function includesSameNodeSmallerHeuristic(list, searchedNode) {
	return list.reduce((accumulator, currentNode) => {
		return (
			accumulator ||
			(currentNode.row === searchedNode.row &&
				currentNode.col === searchedNode.col &&
				currentNode.heuristic <= searchedNode.heuristic)
		);
	}, false);
}

function compareHeuristic(node1, node2) {
	if (node1.heuristic > node2.heuristic) {
		return 1;
	} else if (node1.heuristic === node2.heuristic) {
		return 0;
	} else {
		return -1;
	}
}
