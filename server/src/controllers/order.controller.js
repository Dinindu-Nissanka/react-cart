const db = require("../models");
const Order = db.orders;
const Logger = require("../services/logger.service");

const logger = new Logger("order.controller");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.products) {
    res.status(400).send({ message: "Content can not be empty!" });
    logger.error("Content can not be empty!", req.body);
    return;
  }

  // Create a
  const order = new Order({
    products: req.body.products,
    status: "Received",
  });

  // Save  in the database
  order
    .save(order)
    .then((data) => {
      logger.info("Order creation was successful", data);
      res.send(data);
    })
    .catch((err) => {
      logger.error("Some error occurred while creating the Order.", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Order.find(condition)
    .then((data) => {
      logger.info("Get all orders", data);
      res.send(data);
    })
    .catch((err) => {
      logger.error("Error while fetching all Orders", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Orders were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders.",
      });
    });
};
