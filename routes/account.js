const { users } = require("../models/User");

const getAccountPage = (req, res) => {
  res.render("account", {
    title: "Account",
    name: "Account page",
    users,
  });
};

module.exports = getAccountPage;
