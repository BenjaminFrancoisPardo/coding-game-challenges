let clues = [];

const N = parseInt(readline());

for (let i = 0; i < N; i++) {
	const line = readline();
	const name = line.match(/^\w+/)[0];
	const location = line.match(/I was in the ([a-z]+)/)[1];
	const regex = /([a-zA-Z]+)( and|\.)/g;
	let match = regex.exec(line);
	let friends = [];
	while (match) {
		friends.push(match[1]);
		match = regex.exec(line);
	}
	clues.push({
		name,
		location,
		friends,
	});
}

const checkIfAlone = (suspect, location, clues) => {
	let fishy = false;
	let i = 0;
	while (!fishy && i < clues.length) {
		if (clues[i].friends.includes(suspect)) {
			fishy = true;
		}
		i++;
	}
	return !fishy;
};

const checkIfWithFriend = (suspect, friend, location, clues) => {
	let fishy = false;
	let i = 0;

	while (!fishy && i < clues.length) {
		if (clues[i].name === friend) {
			if (
				!clues[i].friends.includes(suspect) ||
				!clues[i].location === location
			) {
				fishy = true;
			}
		}
		i++;
	}
	return !fishy;
};

let suspects = clues.map((clue) => clue.name);
let innocents = [];
let i = 0;
let isAlone = false;

const susNb = clues.length;
clues.forEach((clue) => {
	let fishy = false;
	let tempSuspects = [...suspects];
	const suspect = clue.name;
	const friends = clue.friends;
	const location = clue.location;
	if (friends[0] === 'alone') {
		fishy = !checkIfAlone(suspect, location, clues);
		isAlone = true;
	} else {
		friends.forEach((friend) => {
			if (!checkIfWithFriend(suspect, friend, location, clues)) {
				fishy = true;
			}
		});
	}
	if (!fishy && !isAlone) {
		innocents.push(...tempSuspects.splice(i, 1));
	}
	i++;
});

const finalSuspects = suspects.filter((sus) => !innocents.includes(sus));

const finalSusNb = susNb - innocents.length;

if (finalSusNb === 0) {
	console.log('It was me!');
}

if (finalSusNb === 1) {
	let culprit = finalSuspects[0];
	console.log(`${culprit} did it!`);
}

if (finalSusNb >= 2) {
	let culprit;
	clues.forEach((clue) => {
		if (finalSuspects.includes(clue.name) && clue.friends[0] != 'alone') {
			culprit = clue.name;
		}
		if (finalSuspects.includes(clue.name) && clue.friends[0] === 'alone') {
			clues.forEach((item) => {
				if (innocents.includes(item.name) && item.location === clue.location) {
					culprit = clue.name;
				}
			});
		}
	});
	console.log(`${culprit} did it!`);
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
