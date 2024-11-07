const { products } = require("../models/Product");

const getAllProducts = () => {
  return products;
};

const getProductById = (product_id) => {
  return products.find((product) => ~~product.id === ~~product_id);
};

module.exports = {
  getAllProducts,
  getProductById,
};
