const Logger = (req, res, next) => {
  req.userId = "123456";
  console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
  next();
};

module.exports = Logger;
