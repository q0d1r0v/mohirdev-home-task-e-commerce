const jwt = require("jsonwebtoken");
const { users } = require("../models/User");

const authMiddleware = (req, res, next) => {
  try {
    const access_token = req.headers.authorization.split("Bearer ")[1];

    if (access_token) {
      jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw err;
        if (users.length) {
          let is_has = false;
          users.forEach((user) => {
            if (user.id == decoded.id) {
              is_has = true;
              req.user = decoded;
            }
          });
          if (is_has) {
            next();
          } else {
            res.status(401).send({
              message: "Unauthorized",
            });
          }
        } else {
          res.status(401).send({
            message: "Unauthorized",
          });
        }
      });
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  authMiddleware,
};
