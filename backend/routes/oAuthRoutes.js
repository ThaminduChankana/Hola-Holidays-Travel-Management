const express = require("express");
const { authOAuth } = require("../controllers/oAuthController");
const router = express.Router();

router.route("/").get(authOAuth);

module.exports = router;
