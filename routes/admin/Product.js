const {
  getProductCategories,
  updateProductImage,
  // findNotActiveProduct,
  // updateProductInstance,
} = require("../../controllers/Admin/Product");
const { updateProduct } = require("../../controllers/Admin/Product");
const {
  
  getProductById,
  updateProductStatus,
  getAllProducts,
  updateStock,
} = require("../../controllers/Admin/Product");
const router = require("express").Router();
const { upload } = require("../../middleware/multer");
const fileUpload = upload.fields([{ name: "productImage", maxCount: 3 }]);
const product = require("../../controllers/Admin/product.controller")

// CREATE PRODUCT
router.post("/create", fileUpload,product.createProduct);
//FIND NOT ACTIVATED PRODUCT
router.get("/not-active/:productCode",product.findNotActiveProduct);
// UPDATE CREATED INSTANCE
router.put("/update-instance/:id",fileUpload,product.updateProductInstance);
// GET PRODUCT
router.get("/details/:id",product.getProductById);
// FETCH PRODUCT CATEGORIES
router.get("/fetch-category",product.getProductCategories);
// GET ALL PRODUCTS
router.get("/all-products",product.getAllProducts);
// UPDATE STOCK
router.put("/update-stock/:productId",product.updateProductStock);
// UPDATEPRODUCT STATUS
router.put("/update-status/:id",product.updateProductStatus);
// router.put("/update-product/:id", updateProduct);

// router.put("/update-stock/:id", updateStock);
// router.put(
//   "/update-image/:id",
//   upload.single("productImage"),
//   updateProductImage
// );

module.exports = router;
