const { getProductCategoriesWithQuantity } = require("../../controllers/Admin/Product");
const {totalSales,totalSalesBySubcategory} = require("../../controllers/Admin/ProductDashboard");
const router = require("express").Router();


router.get("/total-sales",totalSales)
router.get("/total-subcategory-sales",totalSalesBySubcategory)

router.get('/snacks-categories', getProductCategoriesWithQuantity);



module.exports = router;