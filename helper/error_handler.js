function error_handler(err, req, res, next) {
  if (err.name == "UnauthorizedError") {
    return res.status(401).send({ message: "user is not Authrized" });
  }
  if (err.name == "ValidationError") {
    return res.status(401).send({ message: err.name });
  } else {
    return res.status(500).send({ message: "server error" });
  }
}
module.exports = error_handler;
