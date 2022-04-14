"use strict";

const jwt = require("jsonwebtoken");

// module that export a middelware

module.exports = (req, res, next) => {
  // we cought the jwtToken from the header or the query-string or the body
  const jwtToken =
    req.get("Authorization") || req.query.token || req.body.token;

  // we comfirm if wi have a token
  if (!jwtToken) {
    const error = new Error("no token provided");
    error.status = 401;
    next(error);
    return;
  }

  // we comfirm is the token is valid
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const error = new Error("invalid token");
      error.status = 401;
      next(error);
      return;
    }

    req.apiUserId = payload._id;

    // if is valid we continue
    next();
  });
};
