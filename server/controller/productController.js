const productService = require("../services/product.service");
const pool = require("../dbconfig/dbconfig");
module.exports = {
  createProduct: (req, res) => {
    var body = req.body;
    productService.createProduct(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "product added",
        totalItems: results.length,
        product: results,
      });
    });
  },
  getAllProducts: (req, res) => {
    const queries = req.query;
    productService.getAllProducts(queries, (err, results, data) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        result: data,
        totalProducts: results[0].count,
      });
    });
  },
  editProduct: (req, res) => {
    var body = req.body;
    var productId = req.params;
    productService.editProduct(body, productId, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "product edited",
        totalItems: results.length,
        product: results,
      });
    });
  },
  deleteProduct: (req, res) => {
    var productId = req.params.id;
    productService.deleteProduct(productId, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "product deleted",
        totalItems: results.length,
        product: results,
      });
    });
  },
};
