// import logger from "../utils/logger";
// import passport from "passport";

const GoogleStrategy = require("passport-google-oauth20");
const config = require("./config");

const googleAuth = (passport) => {
	GoogleStrategy.Strategy;

	passport.use(
		new GoogleStrategy(
			{
				clientID: config.GOOGLE_CLIENT_ID,
				clientSecret: config.GOOGLE_CLIENT_SECRET,
				callbackURL: config.GOOGLE_REDIRECT_URL,
			},
			(accessToken, refreshToken, profile, callback) => {
				// User.findOrCreate({ googleId: profile.id }, function (err, user) {
				//   return callback(err, user);
				// });
				console.log(profile);
				return callback(null, profile);
			}
		)
	);

	passport.serializeUser(function (user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function (id, callback) {
		// User.findById(id, function (err, user) {
		// 	callback(err, user);
		// });

		callback(null, id);
	});
};

module.exports = { googleAuth };
