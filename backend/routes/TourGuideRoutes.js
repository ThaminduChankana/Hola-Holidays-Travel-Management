const express = require("express");

const { addGuide, getGuides, getGuidesById, updateGuide, deleteGuide } = require("../controllers/TourGuideController");

const router = express.Router();

// customer routes
router.route("/customer/get").get(getGuides);
router.route("/get/:id").get(getGuidesById);

//admin's site routes
router.route("/admin/add").post(addGuide);
router.route("/admin/get").get(getGuides);
router.route("/admin/get/:id").get(getGuidesById).put(updateGuide).delete(deleteGuide);

module.exports = router;
