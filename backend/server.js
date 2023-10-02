const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const siteRoutes = require("./routes/siteRoutes");
const transportRoute = require("./routes/transportRoutes");
const tourGuideRoutes = require("./routes/TourGuideRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// const { googleAuth } = require("./config/google_auth");
// const passport = require("passport");
// const session = require("express");
// const config = require("./config/config");

const helmet = require("helmet");

dotenv.config();
connectDB();
app.use(express.json());

//fixed Cross domain  miss configuration of backend
const corsOptions = {
	origin: ["http://localhost:3000"],
	credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("API is Running");
});

//fix the CSP header vulnerability
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

// fix missing anti-clickjacking header
app.use((req, res, next) => {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
	res.setHeader("X-Frame-Options", "DENY");
	next();
});

app.use(cookieParser());

// fixed ssrf vulnerability issue
function isURLValid(url) {
	const allowedPrefix = "https://localhost:5001/";

	return url.startsWith(allowedPrefix);
}

app.use((req, res, next) => {
	const url = req.query.url;
	if (url && url.trim() !== "") {
		if (!isURLValid(url)) {
			res.status(400).send("Invalid URL.");
			return;
		}
	}

	next();
});

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
// 	session({
// 		secret: config.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 		cookie: {
// 			secure: false,
// 			expires: new Date(Date.now() + 10000),
// 			maxAge: 10000,
// 		},
// 	})
// );

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

const PORT = 5001 || 5002;

app.listen(PORT, () => {
	console.log(`Server Started on port ${PORT}..`);
	// googleAuth(passport);
});
