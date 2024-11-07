const { getProductById } = require("../controllers/productController");

const getProductDetailsPage = (req, res) => {
  const { id } = req.params;

  const product = getProductById(id);
  res.render("products/details", {
    title: "Product details",
    name: "Product details page",
    product,
  });
};

module.exports = getProductDetailsPage;
