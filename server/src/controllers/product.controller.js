const db = require("../models");
const Product = db.products;
const Logger = require("../services/logger.service");

const logger = new Logger("product.controller");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    logger.error("Content can not be empty!", req.body);
    return;
  }

  // Create a Product
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    inventory: req.body.inventory,
  });

  // Save Product in the database
  product
    .save(product)
    .then((data) => {
      logger.info("Product creation was successful", data);
      res.send(data);
    })
    .catch((err) => {
      logger.error("Some error occurred while creating the Product.", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      logger.info("Get all products", data);
      res.send(data);
    })
    .catch((err) => {
      logger.error("Error while fetching all products", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
};

// Find all published Products
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};
