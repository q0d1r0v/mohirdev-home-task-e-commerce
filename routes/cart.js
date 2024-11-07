const { carts } = require("../models/Cart");

const getCartPage = (req, res) => {
  const { id } = req.params;
  const selected_carts = carts.map((cart) => {
    if (id == cart.user_id) {
      return cart;
    }
  });
  res.render("cart", {
    title: "Cart",
    name: "Cart page",
    selected_carts,
  });
};

module.exports = getCartPage;
