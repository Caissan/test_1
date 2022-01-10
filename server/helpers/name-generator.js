import namesArray from './names.js';
import surnamesArray from './surnames.js';

export default () => {
	const randomName = namesArray[Math.floor(Math.random() * namesArray.length)];
	const randomSurName = surnamesArray[Math.floor(Math.random() * surnamesArray.length)];
	return `${randomName} ${randomSurName}`;
};