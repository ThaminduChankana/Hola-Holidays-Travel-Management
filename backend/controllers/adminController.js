const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ADMIN_SESSIONS = new Map();

// register user as a admin
const registerAdmin = asyncHandler(async (req, res) => {
	const { name, telephone, address, email, password, pic } = req.body;

	const adminExists = await Admin.findOne({ email });

	if (adminExists) {
		res.status(400);
		throw new Error("Admin Profile Exists !");
	}

	const user = ADMIN_SESSIONS.get(req.cookies.sessionId);
	if (user == null || user.csrfToken !== req.body.csrfToken) {
		res.sendStatus(401);
		return;
	}

	const admin = new Admin({
		name,
		telephone,
		address,
		email,
		password,
		pic,
	});

	const salt = await bcrypt.genSalt(10);

	admin.password = await bcrypt.hash(password, salt);

	await admin.save();

	if (admin) {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			isAdmin: admin.isAdmin,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			pic: admin.pic,
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error("Admin Registration Failed !");
	}
});

// authenticate the admin
const authAdmin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const admin = await Admin.findOne({ email });

	if (!admin) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}

	const isMatch = await bcrypt.compare(password, admin.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	} else {
		const sessionId = crypto.randomUUID();
		const csrfToken = crypto.randomUUID();

		const id = admin._id;
		ADMIN_SESSIONS.set(sessionId, { id, csrfToken });
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 2);

		//Set the cookie
		res.cookie("sessionId", sessionId, {
			httpOnly: false,
			withCredentials: true,
			expires: expirationDate,
		});
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			password: admin.password,
			pic: admin.pic,
			token: generateToken(admin._id),
			csrfToken,
		});
	}
});

// view admin profile
const getAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	if (admin) {
		res.status(201).json(admin);
	} else {
		res.status(400);
		throw new Error("Admin Not Found !");
	}
});

// update admin profile
const updateAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	const user = ADMIN_SESSIONS.get(req.cookies.sessionId);
	if (user == null || user.csrfToken !== req.body.csrfToken) {
		res.sendStatus(401);
		return;
	}

	if (admin) {
		admin.name = req.body.name || admin.name;
		admin.telephone = req.body.telephone || admin.telephone;
		admin.address = req.body.address || admin.address;
		admin.email = req.body.email || admin.email;
		admin.pic = req.body.pic || admin.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			admin.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedAdmin = await admin.save();

		res.json({
			_id: updatedAdmin._id,
			name: updatedAdmin.name,
			isAdmin: updatedAdmin.isAdmin,
			telephone: updatedAdmin.telephone,
			address: updatedAdmin.address,
			email: updatedAdmin.email,
			pic: updatedAdmin.pic,
			token: generateToken(updatedAdmin._id),
		});
	} else {
		res.status(404);
		throw new Error("Admin Not Found !");
	}
});

// create csrf token
const getCSRF = asyncHandler(async (req, res) => {
	const sessionId = req.cookies.sessionId;
	// Check if the session exists in ADMIN_SESSIONS
	if (req.cookies.sessionId) {
		const newCsrfToken = crypto.randomUUID();

		// Assign the new CSRF token to the session object
		const session = ADMIN_SESSIONS.get(req.cookies.sessionId);
		session.csrfToken = newCsrfToken;

		res.json({ newCsrfToken });
	} else {
		res.status(400).json({ message: "Session not found" });
	}
});

module.exports = { ADMIN_SESSIONS, registerAdmin, authAdmin, getAdminProfile, updateAdminProfile, getCSRF };
