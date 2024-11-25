const { STATUS_CODES, MESSAGES } = require("./constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || MESSAGES.SERVER.ERROR,
  });
};

module.exports = errorHandler;
