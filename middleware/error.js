const errorHandler = (err, req, res, next) => {
  console.log(err.stack.cyan.underline);

  const error = { ...err };

  if (error.name === "CastError") {
    error.message = "энэ ID буруу бүтэцтэй ID байна!";
    error.statusCode = 400;
  }
  if (error.code === 11000) {
    error.keyValue.name = "Энэ талбарын утгыг давхардуулж болохгүй !";
    error.statusCode = 400;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error,
  });
};

module.exports = errorHandler;
