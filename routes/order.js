const { orders } = require("../models/Order");

const getOrdersPage = (req, res) => {
  const { id } = req.params;
  const selected_orders = orders.map((order) => {
    if (id == order.user_id) {
      return order;
    }
  });
  res.render("orders", {
    title: "Orders",
    name: "Orders page",
    selected_orders,
  });
};

module.exports = getOrdersPage;
