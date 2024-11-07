const express = require("express");
const server = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

server.set("view engine", "ejs");

server.use(express.static("public"));
server.use(express.json());

// backend action routes
const {
  loginService,
  registerService,
  loadUserData,
} = require("./controllers/authController");
const { addTocart } = require("./controllers/cartController");
const { addToOrder } = require("./controllers/orderController");

// middleware
const { authMiddleware } = require("./middleware/auth");

server.use("/api/load", authMiddleware);

// routes
const getIndexPage = require("./routes/index");
const getOrdersPage = require("./routes/order");
const getProductsPage = require("./routes/product");
const getProductDetailsPage = require("./routes/product-details");
const getCartPage = require("./routes/cart");
const getAccountPage = require("./routes/account");
const { getLoginPage, getRegisterPage } = require("./routes/auth");

// get pages
server.get("/", getIndexPage);
server.get("/products", getProductsPage);
server.get("/auth/login", getLoginPage);
server.get("/auth/register", getRegisterPage);
server.get("/product-details/:id", getProductDetailsPage);
server.get("/cart/:id", getCartPage);
server.get("/orders/:id", getOrdersPage);
server.get("/account", getAccountPage);

// backend actions
server.post("/auth/register", registerService);
server.post("/auth/login", loginService);
server.get("/api/load/user-data", loadUserData);
server.post("/api/load/add-to-cart", addTocart);
server.post("/api/load/add-to-order", addToOrder);

server.listen(port, () => {
  console.log("server is running on port " + port);
});
