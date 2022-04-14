"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/User");

class LoginContoller {
  index(req, res, next) {
    (res.locals.email = ""), (res.locals.error = ""), res.render("login");
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // looking for the user in the DB //
      const user = await User.findOne({ email });

      // if we did not find the user or the password dosent match --> ERROR //
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: "invalid credentials" });
        return;
      }

      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // we return the generated json
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginContoller;
