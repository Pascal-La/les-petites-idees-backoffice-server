const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken._id).select("-password");
      next();
    } catch (error) {
      console.log("Non autorisé, le token a échoué");
      res.status(401);
    }
  }
  if (!token) {
    console.log("Non autorisé, pas de token");
    res.status(401);
  }
};

module.exports = { protected };
