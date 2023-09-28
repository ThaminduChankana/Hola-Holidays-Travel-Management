const express = require("express");
const {
	getReservationsForEachHotel,
	getReservations,
	addReservation,
	updateReservation,
	deleteReservation,
	getTotal,
} = require("../controllers/reservationController");

const router = express.Router();

router.route("/get-reservations/:id").get(getReservationsForEachHotel);

router.route("/reservation/create").post(addReservation);
router.route("/reservation/get/:id").get(getReservations);
router.route("/reservation/get/total/:id").get(getTotal);
router.route("/reservation/update/:id").put(updateReservation);
router.route("/reservation/delete/:id").delete(deleteReservation);

module.exports = router;
