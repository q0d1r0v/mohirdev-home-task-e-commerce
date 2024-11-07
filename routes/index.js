const { products } = require("../models/Product");

const getIndexPage = (req, res) => {
  res.render("index", {
    title: "EJS Templating",
    name: "User",
    products,
  });
};

module.exports = getIndexPage;
