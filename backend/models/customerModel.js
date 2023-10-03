/**
 * This model is implemented for
 * the Customer
 */
const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		isAdmin: {
			type: Boolean,

			default: false,
		},
		telephone: {
			type: String,
		},
		address: {
			type: String,
		},
		gender: {
			type: String,
		},
		country: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		pic: {
			type: String,

			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
		},
		regDate: {
			type: String,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	}
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
