/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways

let links = [];
let bridges = [];

for (let i = 0; i < L; i++) {
	var inputs = readline().split(' ');
	const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
	const N2 = parseInt(inputs[1]);
	links.push([N1, N2]);
}

for (let i = 0; i < E; i++) {
	const EI = parseInt(readline()); // the index of a gateway node
	bridges.push(EI);
}

const findNextNodes = (src) => {
	const nextNodes = links.map((value) => {
		if (value[0] == src) {
			return value[1];
		} else if (value[1] == src) {
			return value[0];
		} else {
			return -1;
		}
	});
	return nextNodes.filter((value) => !(value == -1));
};

const isBridge = (nodes, bridges) => {
	let found = false;
	let i = 0;
	let nearbyBridge;
	while (!found && i < nodes.length) {
		nearbyBridge = bridges.find((x) => x == nodes[i]);
		if (typeof nearbyBridge == 'undefined') {
			i++;
		} else {
			found = true;
		}
	}
	if (typeof nearbyBridge == 'undefined') {
		nearbyBridge = -1;
	}
	return nearbyBridge;
};

// game loop
while (true) {
	const SI = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn
	let found = false;

	let queue = [SI];

	while (!found) {
		const nextNodes = findNextNodes(queue[0]);
		const foundBridge = isBridge(nextNodes, bridges);
		if (foundBridge >= 0) {
			console.log(queue[0] + ' ' + foundBridge);
			found = true;
		} else {
			queue = queue.concat(nextNodes);
			queue.shift();
		}
	}

	// Write an action using console.log()
	// To debug: console.error('Debug messages...');

	// Example: 0 1 are the indices of the nodes you wish to sever the link between
}
