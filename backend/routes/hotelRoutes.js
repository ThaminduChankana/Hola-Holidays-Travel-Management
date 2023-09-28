const express = require("express");
const {
	gethotels,
	addHotel,
	updateHotel,
	getHotelById,
	deleteHotel,
	gethotelsByCustomer,
} = require("../controllers/hotelController");

const router = express.Router();

router.route("/hotel/create").post(addHotel);
router.route("/get-hotels/:id").get(gethotels);
router.route("/hotel/:id").get(getHotelById).put(updateHotel);
router.route("/hotel/delete/:_id").delete(deleteHotel);

router.route("/hotels").get(gethotelsByCustomer);
router.route("/hotels/:id").get(getHotelById);

module.exports = router;
