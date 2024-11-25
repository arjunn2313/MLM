const Snacks = require("../../models/Snacks");
const Crackers = require("../../models/Crackers");
const Product = require("../../models/Product");

// CREATE PRODUCT
// const createProduct = async (req, res) => {
//   try {
//     const {
//       productCode,
//       productName,
//       productCategory,
//       gst,
//       weight,
//       mlmDiscount,
//       referralDiscount,
//       category,
//       normalDiscount,
//       quantity,
//       unit,
//       pieces,
//       price,
//       mlmPrice,
//       referralPrice,
//       normalPrice,
//     } = req.body;

//     const productImages = req.files["productImage"]
//       ? req.files["productImage"].map((file) => file.path)
//       : [];

//     let product;

//     if (category === "Snacks") {
//       product = new Snacks({
//         productCode,
//         productName,
//         productCategory,
//         category,
//         gst,
//         weight,
//         mlmDiscount,
//         referralDiscount,
//         normalDiscount,
//         photos: productImages,
//       });
//     } else if (category === "Crackers") {
//       product = new Crackers({
//         productCode,
//         productName,
//         category,
//         productCategory,
//         gst,
//         quantity,
//         unit,
//         pieces,
//         price,
//         mlmDiscount,
//         referralDiscount,
//         normalDiscount,
//         photos: productImages,
//         mlmPrice,
//         normalPrice,
//         referralPrice,
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid product category" });
//     }

//     await product.save();

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error creating product", error: error.message });
//   }
// };

// CREATE PRODUCT INSTANCE--V2
const createProduct = async (req, res) => {
  try {
    const details = req.body;
    const { category } = req.query;

    console.log(details);

    let product;

    if (category === "Snacks") {
      product = new Snacks({ category, ...details });
    } else if (category === "Crackers") {
      product = new Crackers({ category, ...details });
    } else {
      return res.status(400).json({ message: "Invalid product category" });
    }

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// FIND PRODUCT WITH isActice : false to update the product price and other details
const findNotActiveProduct = async (req, res) => {
  try {
    const { productCode } = req.params;
    const product = await Product.findOne({ productCode, isActive: false });
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching product details",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProductInstance = async (req, res) => {
  try {
    // Destructure req.body and req.files
    const {
      productCode,
      productCategory,
      productName,
      quantity,
      unit,
      pieces,
      gst,
      price,
      mlmDiscount,
      referralDiscount,
      normalDiscount,
      weight,
      mlmPrice,
      normalPrice,
      referralPrice,
    } = req.body;

    const productImages = req.files?.["productImage"]
      ? req.files["productImage"].map((file) => file.path)
      : [];

    // Find the product by productCode
    const product = await Product.findOne({ productCode });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create an object with updated fields
    const updatedFields = {
      ...(productCode && { productCode }),
      ...(productCategory && { productCategory }),
      ...(productName && { productName }),
      ...(quantity && { quantity }),
      ...(unit && { unit }),
      ...(pieces && { pieces }),
      ...(gst && { gst }),
      ...(price && { price }),
      ...(mlmDiscount && { mlmDiscount }),
      ...(mlmPrice && { mlmPrice }),
      ...(normalPrice && { normalPrice }),
      ...(referralPrice && { referralPrice }),
      ...(referralDiscount && { referralDiscount }),
      ...(normalDiscount && { normalDiscount }),
      ...(weight && { weight }),
      isActive: true,
    };

    // Update product images if provided, append new images
    if (productImages.length > 0) {
      product.photos = [...product.photos, ...productImages];
    }

    // Merge the updates into the existing product
    Object.assign(product, updatedFields);

    // Save the updated product to the database
    const updatedProduct = await product.save();

    console.log("Updated Product:", updatedProduct);

    // Send success response
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error.message);
    return res.status(500).json({
      message: "Error while updating product",
      error: error.message,
    });
  }
};

// FETCH PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while fetching product", error: error.message });
  }
};

// FETCH ALL Products

const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1, // Default page to 1
      limit = 10, // Default limit to 10
      category,
      search,
      status,
      productCategory,
    } = req.query;

    // Initialize query object, ensure isActive is set to false
    let query = { isActive: true };

    // Add filters based on request query params
    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (productCategory) {
      query.productCategory = productCategory;
    }

    // Add search filter with case-insensitive regex
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { productCode: { $regex: search, $options: "i" } },
      ];
    }

    // Convert page and limit into integers for pagination
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;

    // Fetch products with pagination
    const products = await Product.find(query)
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    // Get the total count of products matching the query
    const count = await Product.countDocuments(query);

    // Respond with paginated data
    res.status(200).json({
      message: "Products fetched successfully",
      totalPages: Math.ceil(count / limitInt),
      currentPage: pageInt,
      totalProducts: count,
      products: products,
    });
  } catch (error) {
    console.error("Error while fetching products:", error.message);
    res.status(500).json({
      message: "Error while fetching products",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT STATUS
const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);

    if (!status || !["active", "inactive", "out of stock"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while upadting product status",
      error: error.message,
    });
  }
};

// UPDATE STOCK
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productCode,
      productCategory,
      productName,
      totalQuantity,
      totalQuantityUnit,
      pieces,
    } = req.body;
    console.log(req.body);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productCode = productCode || product.productCode;
    product.productCategory = productCategory || product.productCategory;
    product.productName = productName || product.productName;

    if (totalQuantity !== undefined) {
      product.totalQuantity = Number(totalQuantity);
    }

    product.totalQuantityUnit = totalQuantityUnit || product.totalQuantityUnit;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error.message);
    res.status(500).json({
      message: "Error while updating product",
      error: error.message,
    });
  }
};

// GET CATEGORIES
const getProductCategories = async (req, res) => {
  try {
    const { category } = req.query;

    const allowedCategories = ["Crackers", "Snacks"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category. Allowed values are 'Crackers' or 'Snacks'",
      });
    }

    const queryCondition = category ? { category } : {};

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

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productCode,
      productCategory,
      productName,
      quantity,
      unit,
      pieces,
      gst,
      price,
      mlmDiscount,
      referralDiscount,
      normalDiscount,
      weightsPrices,
    } = req.body;

    console.log(weightsPrices);

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only the fields that are provided in the request body
    product.productCode =
      productCode !== undefined ? productCode : product.productCode;
    product.weight =
      weightsPrices !== undefined ? weightsPrices : product.weight;
    product.productCategory =
      productCategory !== undefined ? productCategory : product.productCategory;
    product.price = price !== undefined ? price : product.price;
    product.productName =
      productName !== undefined ? productName : product.productName;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.unit = unit !== undefined ? unit : product.unit;
    product.pieces = pieces !== undefined ? pieces : product.pieces;
    product.gst = gst !== undefined ? gst : product.gst;
    product.mlmDiscount =
      mlmDiscount !== undefined ? mlmDiscount : product.mlmDiscount;
    product.referralDiscount =
      referralDiscount !== undefined
        ? referralDiscount
        : product.referralDiscount;
    product.normalDiscount =
      normalDiscount !== undefined ? normalDiscount : product.normalDiscount;

    // Save the updated product
    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error.message);
    return res.status(500).json({
      message: "Error while updating product status",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT IMAGE
const updateProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { index } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;

    if (index === undefined || isNaN(index)) {
      return res.status(400).json({ message: "Invalid index." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (index < 0 || index >= product.photos.length) {
      return res.status(400).json({ message: "Index out of bounds." });
    }

    product.photos[index] = filePath;

    await product.save();

    return res
      .status(200)
      .json({ message: "Product image updated successfully.", product });
  } catch (error) {
    console.error("Error updating product image:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// extrxt category and quantity
const getProductCategoriesWithQuantity = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { category: "Snacks" } }, // Filter for category "Snacks"
      { 
        $group: {
          _id: "$productCategory", // Group by productCategory
          totalQuantity: { $sum: { $toInt: "$totalQuantity" } } // Sum totalQuantity as integer
        }
      },
      {
        $group: {
          _id: null,
          categories: { $push: { productCategory: "$_id", totalQuantity: "$totalQuantity" } }, // Push each category with total quantity
          combinedTotalQuantity: { $sum: "$totalQuantity" } // Sum up all quantities
        }
      },
      {
        $project: {
          _id: 0,
          categories: 1,
          combinedTotalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: products[0] || { categories: [], combinedTotalQuantity: 0 }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  createProduct,
  getProductById,
  updateProductStatus,
  getAllProducts,
  updateStock,
  getProductCategories,
  updateProduct,
  updateProductImage,
  findNotActiveProduct,
  updateProductInstance,
  getProductCategoriesWithQuantity
};
