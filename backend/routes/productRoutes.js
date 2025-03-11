const express = require("express");
const { getProducts, createProduct, detailProduct } = require("../controllers/productController.js");
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", detailProduct);

module.exports = router;
