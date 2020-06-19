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

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Order with id=" + id });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
        });
      } else res.send({ message: "Order was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      } else {
        res.send({
          message: "Order was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
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

// Find all published Orders
exports.findAllPublished = (req, res) => {
  Order.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    });
};
