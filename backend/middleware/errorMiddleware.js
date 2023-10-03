const notFound = (req, res, next) => {
	const error = new Error("Resource not found");
	res.status(404);
	next(error);
};

const errorHandler = (err, _req, res, _next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
		stack: process.env.NODE_ENV === "development" ? err.stack : null,
	});
};

module.exports = { notFound, errorHandler };
