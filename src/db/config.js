const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/mutantsDb');

		console.log('MongoDB connection established successfully.');
	} catch (error) {
		throw new Error('Error al conectar a la BD.');
	}
};

module.exports = {
	dbConnection,
};
