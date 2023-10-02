/**
 * This model is implemented for
 * the Admin
 */
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: true,
		},
		telephone: {
			type: String,
		},
		address: {
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

			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	},
	{
		timestamps: true,
	}
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
