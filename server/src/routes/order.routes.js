module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new order
  router.post("/", orders.create);

  // Retrieve all orders
  router.get("/", orders.findAll);

  // Delete all orders
  router.delete("/", orders.deleteAll);

  app.use("/api/orders", router);
};
