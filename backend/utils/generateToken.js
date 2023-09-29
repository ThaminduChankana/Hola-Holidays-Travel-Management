const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, "root", {
		expiresIn: "30d",
	});
};

module.exports = generateToken;
