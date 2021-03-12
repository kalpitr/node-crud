const router = require("express").Router();
const controller = require("../controller/categoryController");
router.post("/createcategory", controller.createCategory);
router.get("/getcategories", controller.getAllCategories);
router.put("/updatecategory/:id", controller.editCategory);
router.delete("/deletecategory/:id", controller.deleteCategory);

module.exports = router;
