const express = require("express");
const {
	addSite,
	getSites,
	getSitesForEachLocation,
	getSiteById,
	updateSite,
	deleteSite,
} = require("../controllers/siteController");
const router = express.Router();

//get site routes
router.route("/").get(getSites);
router.route("/location/:id").get(getSitesForEachLocation);
router.route("/get/:id").get(getSiteById);

//admin's site routes
router.route("/admin/add").post(addSite);
router.route("/admin/get").get(getSites);
router.route("/admin/get/:id").get(getSiteById).put(updateSite).delete(deleteSite);

module.exports = router;
