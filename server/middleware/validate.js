exports.validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        // message: "Validation error",
        message:error.details.map(err => err.message)
       // details: error.details.map(err => err.message)
      });
    }
    next();
  };
};
