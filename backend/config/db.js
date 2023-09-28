const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://dreamseers2023:root@hola-holidays.jrucypm.mongodb.net/?retryWrites=true&w=majority",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit();
	}
};

module.exports = connectDB;
