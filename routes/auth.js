const { users } = require("../models/User");

const getLoginPage = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    name: "Login page",
    users,
  });
};

const getRegisterPage = (req, res) => {
  res.render("auth/register", {
    title: "Register",
    name: "Register page",
    users,
  });
};

module.exports = {
  getLoginPage,
  getRegisterPage,
};
