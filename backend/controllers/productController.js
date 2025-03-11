const Product = require('../models/productModel.js')

// Lấy danh sách sản phẩm
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// Tạo sản phẩm mới
const createProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const product = new Product({ name, price, description });
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    next(error);
  }
};

const detailProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProducts, createProduct, detailProduct };