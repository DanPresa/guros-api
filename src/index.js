const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;

const { dbConnection } = require('./db/config');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api', require('./routes/mutation'));

app.listen(port, () => {
	console.log(`Backend-server is running on port: ${port}`);
});
