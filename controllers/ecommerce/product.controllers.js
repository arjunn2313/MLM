const { getUserFromToken } = require("../../services/productService");
const Product = require("../../models/Product");
const Wishlist = require("../../models/Wishlist");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      search,
      rating,
      category,
      productCategory,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const token = req.cookies.token;

    let user = null;
    let wishlistProductIds = [];

    if (token) {
      user = await getUserFromToken(token);

      if (user) {
        const wishlist = await Wishlist.findOne({ userId: user._id }).select(
          "items"
        );
        wishlistProductIds = wishlist?.items
          ? wishlist.items.map((item) => item.productId.toString())
          : [];
      }
    }

    const filters = {};

    if (search) {
      filters.productName = { $regex: search, $options: "i" };
    }

    if (rating) {
      filters.averageRating = { $gte: Number(rating) };
    }

    if (category) {
      filters.category = category;
    }

    if (productCategory) {
      filters.productCategory = productCategory;
    }

    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      sort: { [sortBy]: order === "asc" ? 1 : -1 },
    };

    const products = await Product.find(filters)
      .populate({
        path: "varient",
        select: `variantType variants.value variants.unit variants.price ${
          user?.isMlmAgent ? "variants.mlmPrice" : "variants.normalPrice"
        }`,
      })
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort);

    const filteredProducts = products.filter((product) => {
      if (minPrice || maxPrice) {
        const priceMatches = product.varient.variants.some((variant) => {
          const price = variant.price;
          return (
            (minPrice ? price >= minPrice : true) &&
            (maxPrice ? price <= maxPrice : true)
          );
        });
        return priceMatches;
      }
      return true;
    });

    const transformedProducts = filteredProducts.map((product) => ({
      ...product._doc,
      isInWishlist: user
        ? wishlistProductIds.includes(product._id.toString())
        : false,
    }));
    const total = await Product.countDocuments(filters);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      products: transformedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCT

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    let user = null;
    let wishlistProductIds = [];

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    if (token) {
      user = await getUserFromToken(token);

      if (user) {
        const wishlist = await Wishlist.findOne({ userId: user._id }).select(
          "products"
        );
        wishlistProductIds = wishlist
          ? wishlist.products.map((id) => id.toString())
          : [];
      }
    }

    const product = await Product.findById(id).populate({
      path: "varient",
      select: `variantType variants.value variants.unit variants.price ${
        user?.isMlmAgent ? "variants.mlmPrice" : "variants.normalPrice"
      }`,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const transformedProduct = {
      ...product._doc,
      isInWishlist: user
        ? wishlistProductIds.includes(product._id.toString())
        : false,
    };

    res.status(200).json({
      success: true,
      product: transformedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching product details.",
      error: error.message,
    });
  }
};

// GET ALL SUB CATEORIES
exports.getProductCategories = async (req, res) => {
  try {
    const { category } = req.query;

    const allowedCategories = ["Crackers", "Snacks"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category. Allowed values are 'Crackers' or 'Snacks'",
      });
    }

    const queryCondition = { isActive: true };
    if (category) {
      queryCondition.category = category;
    }

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
