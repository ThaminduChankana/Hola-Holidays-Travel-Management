const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");

// register user as a admin
const registerAdmin = asyncHandler(async (req, res) => {
	const { name, telephone, address, email, password, pic } = req.body;

	const adminExists = await Admin.findOne({ email });
	if (adminExists) {
		res.status(400);
		throw new Error("Admin Profile Exists !");
	}

	const admin = new Admin({
		name,
		telephone,
		address,
		email,
		password,
		pic,
	});

	const addedAdmin =await admin.save();

	if (admin) {
		res.status(201).json(addedAdmin);
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

	if (!(password === admin.password)) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	} else {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			password: admin.password,
			pic: admin.pic,
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

	if (admin) {
		admin.name = req.body.name || admin.name;
		admin.telephone = req.body.telephone || admin.telephone;
		admin.address = req.body.address || admin.address;
		admin.email = req.body.email || admin.email;
		admin.pic = req.body.pic || admin.pic;
		admin.password = req.body.password || admin.password;
		
		const updatedAdmin = await admin.save();

		res.json({
			_id: updatedAdmin._id,
			name: updatedAdmin.name,
			isAdmin: updatedAdmin.isAdmin,
			telephone: updatedAdmin.telephone,
			address: updatedAdmin.address,
			email: updatedAdmin.email,
			pic: updatedAdmin.pic,
		});
	} else {
		res.status(404);
		throw new Error("Admin Not Found !");
	}
});

module.exports = { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile };
