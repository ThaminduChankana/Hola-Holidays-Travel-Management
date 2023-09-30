require("dotenv").config();

const config = {
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
	SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = config;
