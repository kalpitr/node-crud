const categoryService = require("../services/category.service");
const pool = require("../dbconfig/dbconfig");
module.exports = {
  createCategory: (req, res) => {
    var body = req.body;
    categoryService.createCategory(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "category added",
        totalItems: results.length,
        category: results,
      });
    });
  },
  getAllCategories: (req, res) => {
    categoryService.getAllCategories((err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        results: results.length,
        data: results,
      });
    });
  },
  editCategory: (req, res) => {
    var body = req.body;
    var categoryId = req.params;

    categoryService.editCategory(body, categoryId, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "category edited",
        totalItems: results.length,
        category: results,
      });
    });
  },
  deleteCategory: (req, res) => {
    var categoryId = req.params.id;
    categoryService.deleteCategory(categoryId, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "category deleted",
        totalItems: results.length,
        category: results,
      });
    });
  },
};
