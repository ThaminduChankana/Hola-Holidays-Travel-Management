const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

// register  customer profile
const registerCustomer = asyncHandler(async (req, res) => {
	const { firstName, lastName, telephone, address, gender, country, email, password, pic } = req.body;

	const customerExists = await Customer.findOne({ email });
	if (customerExists) {
		res.status(400);
		throw new Error("Customer Profile Exists !");
	}

	const customer = new Customer({
		firstName,
		lastName,
		telephone,
		address,
		gender,
		country,
		email,
		password,
		pic,
	});

	const addedCustomer =await customer.save();

	if (customer) {
		res.status(201).json(addedCustomer);
	} else {
		res.status(400);
		throw new Error("Customer Registration Failed !");
	}
});

//authenticate customer profile
const authCustomer = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const customer = await Customer.findOne({ email });

	if (!customer) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	}
	if (!(password === customer.password)) {
		res.status(400);
		throw new Error("Invalid Email or Password");
	} else {
		res.status(201).json({
			_id: customer._id,
			firstName: customer.firstName,
			lastName: customer.lastName,
			telephone: customer.telephone,
			address: customer.address,
			gender: customer.gender,
			country: customer.country,
			email: customer.email,
			pic: customer.pic,
			regDate: customer.regDate,
		});
	}
});

//get all of customers list
const getCustomers = asyncHandler(async (req, res) => {
	const customers = await Customer.find();
	res.json(customers);
});

// view customer profile by customer
const getCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(400);
		throw new Error("Customer not found !");
	}
});

// view customer profile by admin
const getCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(400);
		throw new Error("Customer not found !");
	}
});

//update customer profile by customer
const updateCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		customer.firstName = req.body.firstName || customer.firstName;
		customer.lastName = req.body.lastName || customer.lastName;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.gender = req.body.gender || customer.gender;
		customer.country = req.body.country || customer.country;
		customer.email = req.body.email || customer.email;
		customer.pic = req.body.pic || customer.pic;
		customer.password = req.body.password || customer.password;
		
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			firstName: updatedCustomer.firstName,
			lastName: updatedCustomer.lastName,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			gender: updatedCustomer.gender,
			country: updatedCustomer.country,
			email: updatedCustomer.email,
			pic: updatedCustomer.pic,
			regDate: updatedCustomer.regDate,
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

//update customer profile by admin
const updateCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		customer.firstName = req.body.firstName || customer.firstName;
		customer.lastName = req.body.lastName || customer.lastName;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.gender = req.body.gender || customer.gender;
		customer.country = req.body.country || customer.country;
		customer.email = req.body.email || customer.email;
		customer.pic = req.body.pic || customer.pic;
		customer.password = req.body.password || customer.password;
		
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			firstName: updatedCustomer.firstName,
			lastName: updatedCustomer.lastName,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			gender: updatedCustomer.gender,
			country: updatedCustomer.country,
			email: updatedCustomer.email,
			pic: updatedCustomer.pic,
			regDate: updatedCustomer.regDate,
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

// delete customer profile by  customer
const deleteCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		await customer.deleteOne();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

// delete customer profile by admin
const deleteCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		await customer.deleteOne();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

module.exports = {
	registerCustomer,
	authCustomer,
	getCustomers,
	getCustomerProfile,
	getCustomerProfileById,
	updateCustomerProfile,
	updateCustomerProfileById,
	deleteCustomerProfile,
	deleteCustomerProfileById,
};
