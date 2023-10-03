const express = require("express");
const passport = require("./utils/googleAuth"); // Import the Google OpenID setup
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const siteRoutes = require("./routes/siteRoutes");
const transportRoute = require("./routes/transportRoutes");
const tourGuideRoutes = require("./routes/TourGuideRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/oAuthRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const helmet = require("helmet");

dotenv.config();
connectDB();
app.use(express.json());

//Fixed Cross-domain miss-configuration of the backend
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: 'GET,HEAD,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

// Fix the CSP header vulnerability
app.use(helmet());

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "trusted-scripts.com"],
			styleSrc: ["'self'", "trusted-styles.com"],
		},
		reportOnly: true,
	})
);

// Initialize Passport and session management
app.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2.0 routes
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"], // Define the scopes you need
	})
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/loading", // Redirect to the homepage after successful authentication
		failureRedirect: "http://localhost:3000/customer-login", // Redirect to login page if authentication fails
	})
);

// Protected route example
app.get("/protected-route", ensureAuthenticated, (req, res) => {
	// This route will only be accessible to authenticated users
	res.json({ message: "You have access to the protected route!", user: req.user });
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next(); // User is authenticated, continue to the protected route
	}
	res.status(401).json({ message: "Unauthorized" }); // User is not authenticated, send a 401 Unauthorized response
}

// Use your existing routes
app.use("/auth", authRoutes);
app.use("/user/admin", adminRoutes);
app.use("/user/customer", customerRoutes);
app.use("/sites", siteRoutes);
app.use("/transport", transportRoute);
app.use("/guide", tourGuideRoutes);
app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/reservations", reservationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(`Server Started on port ${PORT}..`);
});
