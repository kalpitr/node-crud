const router = require("express").Router();
const controller = require("../controller/productController");
router.post("/createproduct", controller.createProduct);
router.get("/getallproducts", controller.getAllProducts);
router.put("/updateproduct/:id", controller.editProduct);
router.delete("/deleteproduct/:id", controller.deleteProduct);

module.exports = router;
