const { products } = require("../models/Product");

const getProductsPage = (req, res) => {
  res.render("products", {
    title: "Products",
    name: "Products page",
    products,
  });
};

module.exports = getProductsPage;
