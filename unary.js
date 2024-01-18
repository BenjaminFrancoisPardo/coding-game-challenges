/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

const MESSAGE = readline();
const stringToBinary = (string) =>
	string
		.split('')
		.map((char) => {
			let bin = char.charCodeAt(0).toString(2);
			const length = bin.length;
			if (length < 7) {
				for (let i = 0; i < 7 - length; i++) {
					bin = '0' + bin;
				}
			}
			return bin;
		})
		.join('');
const strZeros = (num) => Array(num).fill('0').join('');
const binary = stringToBinary(MESSAGE).split('');
const blocks = [];

let type = parseInt(binary[0]);
let number = 1;

binary.forEach((char, index) => {
	if (index > 0) {
		const digit = parseInt(char);
		if (type == digit) {
			number++;
		} else {
			blocks.push(`${type ? '0' : '00'} ${strZeros(number)}`);
			type = digit;
			number = 1;
		}
	}
});
blocks.push(`${type ? '0' : '00'} ${strZeros(number)}`);

const output = blocks.join(' ');

console.log(output);
