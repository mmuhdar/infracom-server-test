const error = (err, req, res, next) => {
  let code;
  let message;
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map((el) => el.message);
      message = errors;
      code = 400;
      break;
    case "NotFound":
      message = "Data not found";
      code = 404;
      break;

    default:
      message = "Internal Server Error";
      code = 500;
      break;
  }
  res.status(code).json({ message });
};

module.exports = error;
