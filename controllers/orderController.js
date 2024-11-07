const { v4: uuidv4 } = require("uuid");
const { orders } = require("../models/Order");
const { products } = require("../models/Product");

const addToOrder = (req, res) => {
  const { product_id } = req.body;
  let product = {};
  products.forEach((p) => {
    if (product_id == p.id) {
      product = p;
    }
  });
  const new_order = {
    id: uuidv4(),
    product,
    user_id: req.user.id,
  };
  orders.push(new_order);

  res.send({
    message: "Mahsulotga buyurtma berildi!",
  });
};

module.exports = {
  addToOrder,
};
