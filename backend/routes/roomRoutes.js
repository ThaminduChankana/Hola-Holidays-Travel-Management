const express = require("express");
const { getRooms, createRoom, getRoomById, updateRoom, deleteRoom } = require("../controllers/roomController");
const {
	getReservations,
	addReservation,
	updateReservation,
	deleteReservation,
	getTotal,
} = require("../controllers/reservationController");

const router = express.Router();

router.route("/room/create").post(createRoom);
router.route("/get-rooms/:id").get(getRooms);
router.route("/room/:id").get(getRoomById).put(updateRoom);
router.route("/room/delete/:id").delete(deleteRoom);

router.route("/rooms/:id").get(getRooms);

router.route("/reservation/create").post(addReservation);
router.route("/reservation/get/:id").get(getReservations);
router.route("/reservation/get/total/:id").get(getTotal);
router.route("/reservation/update/:id").put(updateReservation);
router.route("/reservation/delete/:id").delete(deleteReservation);

module.exports = router;
