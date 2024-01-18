/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const L = parseInt(readline());
const H = parseInt(readline());
const T = readline();
const getIndex = (letter) => {
	const index = letter.toUpperCase().charCodeAt(0) - 65;
	return index < 0 || index > 26 ? 26 * L : index * L;
};
const indexes = [...T].map((e) => getIndex(e));

let output = '';

for (let i = 0; i < H; i++) {
	const ROW = readline();
	let newRow = '';
	indexes.forEach((index) => {
		newRow += ROW.substring(index, index + L);
	});
	output += newRow + '\n';
}

console.log(output);
