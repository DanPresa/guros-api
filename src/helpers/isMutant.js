const findMutantBlocks = (matrix) => {
	let regex = /([ATGC])\1{3,4}/;

	let straight = matrix.filter((string) => {
		return regex.test(string);
	});

	let right = getRightDiagonal(matrix).filter((string) => {
		return regex.test(string);
	});

	let left = getLeftDiagonal(matrix).filter((string) => {
		return regex.test(string);
	});

	return straight.concat(right).concat(left);
};

const getRightDiagonal = (m) => {
	var s,
		x,
		y,
		d,
		o = [];

	for (s = 0; s < m.length; s++) {
		d = [];
		for (y = s, x = 0; y >= 0; y--, x++) d.push(m[y][x]);
		o.push(d);
	}

	for (s = 1; s < m[0].length; s++) {
		d = [];
		for (y = m.length - 1, x = s; x < m[0].length; y--, x++) d.push(m[y][x]);
		o.push(d);
	}

	return o.map((array) => {
		return array.join('');
	});
};

const getLeftDiagonal = (m) => {
	let reverse = reverseMatrix(m);
	const matrixTransformer = getRightDiagonal(reverse);

	return matrixTransformer;
};

const reverseString = (string) => {
	const convertString = string.split('').reverse().join('');

	return convertString;
};

const reverseMatrix = (m) => {
	return m.map((string) => {
		return reverseString(string);
	});
};

const hasMutation = function (matrix) {
	let blocks = findMutantBlocks(matrix);

	try {
		return blocks.length > 1;
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Error to read mutation.',
		});
	}
};

module.exports = {
	hasMutation,
};
