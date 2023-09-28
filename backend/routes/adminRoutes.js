const express = require("express");
const { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const {
	getCustomers,
	updateCustomerProfileById,
	deleteCustomerProfileById,
	getCustomerProfileById,
} = require("../controllers/customerController");
const router = express.Router();

//Routes for Admin Account Operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/view").get(getAdminProfile);
router.route("/edit").put(updateAdminProfile);

//Routes for Customer account operations admin end
router.route("/customer/profile/view/:_id").get(getCustomerProfileById).delete(deleteCustomerProfileById);
router.route("/customer/profile/edit/:_id").put(updateCustomerProfileById);
router.route("/customers").get(getCustomers);

module.exports = router;
