const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const authOAuth = asyncHandler(async (req, res) => {
	req.session.user = req.user;
	if (req.session.user) {
		res.status(201).json({
			_id: req.session.user._id,
			firstName: req.session.user.firstName,
			lastName: req.session.user.lastName,
			telephone: req.session.user.telephone,
			address: req.session.user.address,
			gender: req.session.user.gender,
			country: req.session.user.country,
			email: req.session.user.email,
			pic: req.session.user.pic,
			token: generateToken(req.session.user._id),
		});
	}
});

module.exports = { authOAuth };
