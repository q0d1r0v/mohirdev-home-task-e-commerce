const { v4: uuidv4 } = require("uuid");
const { carts } = require("../models/Cart");
const { products } = require("../models/Product");

const addTocart = (req, res) => {
  const { product_id } = req.body;
  let product = {};
  products.forEach((p) => {
    if (product_id == p.id) {
      product = p;
    }
  });
  const new_cart = {
    id: uuidv4(),
    product,
    user_id: req.user.id,
  };
  carts.push(new_cart);

  res.send({
    message: "Mahsulot savatga qo'shildi!",
  });
};

module.exports = {
  addTocart,
};
