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
// router.post("/create", fileUpload, createProduct);
router.post("/create", fileUpload,product.createProduct);
//FIND NOT ACTIVATED PRODUCT
router.get("/not-active/:productCode",product.findNotActiveProduct);
// UPDATE CREATED INSTANCE
router.put("/update-instance/:id",fileUpload,product.updateProductInstance);
router.get("/details/:id",product.getProductById);
router.get("/fetch-category",product.getProductCategories);
router.get("/all-products",product.getAllProducts);
router.put("/update-product/:id", updateProduct);
router.put("/update-status/:id", updateProductStatus);
router.put("/update-stock/:id", updateStock);
router.put(
  "/update-image/:id",
  upload.single("productImage"),
  updateProductImage
);

module.exports = router;
