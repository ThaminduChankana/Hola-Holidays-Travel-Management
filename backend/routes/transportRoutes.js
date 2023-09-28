const express = require("express");
const {
	addNewTransport,
	getOneTransport,
	getTransport,
	deleteTransport,
	updateTransport,
} = require("../controllers/transportController");

const router = express.Router();

//routes for bus details - customer
router.route("/").get(getTransport);
router.route("/get/:id").get(getOneTransport);

//routes for bus details - admin
router.route("/admin/add").post(addNewTransport);
router.route("/admin/get").get(getTransport);
router.route("/admin/get/:id").get(getOneTransport).put(updateTransport).delete(deleteTransport);

module.exports = router;
