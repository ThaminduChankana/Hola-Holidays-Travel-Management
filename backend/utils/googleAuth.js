const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Customer = require("../models/customerModel");
const dotenv = require("dotenv");

dotenv.config();

// Initialize passport
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5001/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if the user exists in your database
				let customer = await Customer.findOne({ email: profile.emails[0].value });

				if (customer) {
					// User already exists, return the customer object
					console.log("User already exists in the database Logging in..");
					return done(null, customer);
				} else {
					// Create a new customer if the user doesn't exist
					customer = new Customer({
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						gender: profile.gender,
						email: profile.emails[0].value,
						pic: profile.photos[0].value,
					});

					await customer.save();

					return done(null, customer);
				}
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const customer = await Customer.findById(id);
		done(null, customer);
	} catch (error) {
		done(error, null);
	}
});

module.exports = passport;
