const Product = require("../../models/Product");
const Wishlist = require("../../models/Wishlist");
const {
  getUserFromToken,
  calculateDiscountPrice,
  buildQuery,
  getWishlistItems,
  calculateWeights,
} = require("../../services/productService");

// GET ALL
exports.getAllProducts = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    const user = await getUserFromToken(token);

    const isMlmAgent = user?.isMlmAgent || false;

    const { page = 1, limit = 10, ...queryParams } = req.query;

    const query = buildQuery(queryParams);

    const products = await Product.find(query)
      .select(
        "productName rating price mlmPrice normalPrice mlmDiscount normalDiscount category weight _id productCode"
      )
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Product.countDocuments(query);

    const wishlistItems = user ? await getWishlistItems(user._id) : [];

    const modifiedProducts = products.map((product) => {
      const pricingDetails = calculateWeights(
        product.weight,
        product,
        isMlmAgent
      );

      return {
        productName: product.productName,
        rating: product.rating || 0,
        productCode:product.productCode,
        _id:product._id,

        ...(product.category === "Crackers"
          ? {
              actualPrice: pricingDetails.actualPrice,
              discountPrice: pricingDetails.discountPrice,
            }
          : {
              weights: pricingDetails,
            }),
        isInWishlist: wishlistItems.includes(product._id.toString()),
      };
    });

    res.json({
      products: modifiedProducts,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error)
  }
};

// GET SINGLE PRODUCT

exports.getProductByIdOrCode = async (req, res) => {
  try {
    const { id, productCode } = req.params;
    const token = req.cookies.token;

    let isMlmAgent = false;
    let isInWishlist = false;

    // Fetch user and determine if they are an MLM agent
    const user = await getUserFromToken(token);
    if (user) {
      isMlmAgent = user.isMlmAgent;

      // Check if the product is in the user's wishlist
      const wishlist = await Wishlist.findOne({ userId: user._id }).lean();
      if (wishlist) {
        const wishlistItems = wishlist.items.map((item) => item.productId.toString());
        if (id) isInWishlist = wishlistItems.includes(id);
        if (productCode) {
          const product = await Product.findOne({ productCode }).select('_id').lean();
          if (product) isInWishlist = wishlistItems.includes(product._id.toString());
        }
      }
    }

    // Build query based on provided parameters
    const query = id ? { _id: id } : productCode ? { productCode } : null;
    if (!query) {
      return res.status(400).json({ message: "Product ID or Product Code is required" });
    }

    // Find the product
    const product = await Product.findOne(query).lean() 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate prices based on category and agent type
    let actualPrice, discountPrice;
    if (product.category === "Snacks") {
      // Snacks-specific pricing
      const weight = Array.isArray(product.weight) && product.weight.length > 0 ? product.weight[0] : {};
      actualPrice = parseFloat(weight.price || 0);
      discountPrice = isMlmAgent
        ? parseFloat(weight.mlmPrice || actualPrice)
        : parseFloat(weight.normalPrice || actualPrice);
    } else if (product.category === "Crackers") {
      // Crackers-specific pricing
      actualPrice = parseFloat(product.price);
      discountPrice = isMlmAgent
        ? parseFloat(product.mlmPrice || actualPrice)
        : parseFloat(product.normalPrice || actualPrice);
    } else {
      // Default pricing for other categories
      actualPrice = parseFloat(product.price);
      discountPrice =
        actualPrice - (isMlmAgent ? parseFloat(product.mlmDiscount || 0) : parseFloat(product.normalDiscount || 0));
    }

    // Return the response
    res.status(200).json({
      message: "Product fetched successfully",
      product: {
        ...product,
        actualPrice: actualPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        isInWishlist,
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Error while fetching product",
      error: error.message,
    });
  }
};

// GET ALL SUB CATEORIES
exports.getProductCategories = async (req, res) => {
  try {
    const { category } = req.query;

    // Allowed categories to filter by
    const allowedCategories = ["Crackers", "Snacks"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category. Allowed values are 'Crackers' or 'Snacks'",
      });
    }

    // Add the active condition and optional category filter
    const queryCondition = { isActive: true };
    if (category) {
      queryCondition.category = category;
    }

    // Fetch distinct categories for active products
    const categories = await Product.distinct(
      "productCategory",
      queryCondition
    );

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({
      message: "Product categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Error fetching product categories:", error.message);
    res.status(500).json({
      message: "Error fetching product categories",
      error: error.message,
    });
  }
};
