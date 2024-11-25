const router = require("express").Router();
const Product =require("../../controllers/ecommerce/product.controllers")
 

router.get("/all-products",Product.getAllProducts);
router.get("/single-product/:id",Product.getProductByIdOrCode);
router.get("/subcategories",Product.getProductCategories);

module.exports = router;
