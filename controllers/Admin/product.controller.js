const Product = require("../../models/Product");
const Variant = require("../../models/Varient");
const { generateSku } = require("../../utils/ProductServices");

// CREATE PRODUCT INSTANCE
exports.createProduct = async (req, res) => {
  try {
    const {
      productCode,
      category,
      productName,
      totalQuantity,
      totalQuantityUnit,
      productCategory,
      variantType,
    } = req.body;

    const product = new Product({
      productCode,
      category,
      productName,
      productCategory,
      variantType,
    });

    const savedProduct = await product.save();

    const variant = new Variant({
      productId: product._id,
      totalQuantity,
      totalQuantityUnit,
      variantType,
    });

    await variant.save();
    product.varient = variant._id;
    await product.save();

    res.status(201).json({
      message: "Product and variants created successfully",
      product: savedProduct,
      variant,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// FIND PRODUCT WITH isActice : false to update the product price and other details
exports.findNotActiveProduct = async (req, res) => {
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

// UPDATE PRODUCT INSTANCE
exports.updateProductInstance = async (req, res) => {
  try {
    const { productCode, category, productName, gst, variants } = req.body;

    const { id } = req.params;

    const productImages = req.files.productImage.map((file) => file.path);

    const product = await Product.findOne({ productCode: id });

    if (productImages.length > 0) {
      product.photos = [...product.photos, ...productImages];
      await product.save();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        productCode,
        category,
        productName,
        gst,
        isActive: true,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    let updatedVariant = await Variant.findOne({ productId: product._id });

    if (updatedVariant) {
      const updatedVariantData = variants.map((variant) => {
        const sku = generateSku(
          productCode,
          updatedVariant.variantType,
          variant.value
        );
        return {
          sku,
          value: variant.value,
          unit: variant.unit,
          price: variant.price,
          pieces: variant.pieces,
          mlmPrice: variant.mlmPrice,
          referralPrice: variant.referralPrice,
          normalPrice: variant.normalPrice,
          mlmDiscount: variant.mlmDiscount,
          referralDiscount: variant.referralDiscount,
          normalDiscount: variant.normalDiscount,
        };
      });

      updatedVariant.variants = updatedVariantData;

      await updatedVariant.save();
    }

    res.status(201).json({
      message: "Product and variants created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// FETCH PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("varient");

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

// GET CATEGORIES
exports.getProductCategories = async (req, res) => {
  try {
    const { category } = req.query;

    const allowedCategories = ["Crackers", "Snacks"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category. Allowed values are 'Crackers' or 'Snacks'",
      });
    }

    const queryCondition = { isActive: true, ...(category && { category }) };

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

// GET ALL PRODUCT
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      status,
      selectedCategory,
    } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (selectedCategory) {
      query.productCategory = selectedCategory;
    }

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { productCode: { $regex: search, $options: "i" } },
      ];
    }

    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;

    const products = await Product.find(query)
      .populate("varient")
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt)
      .sort({ createdAt: -1 })
      .lean();

    const count = await Product.countDocuments(query);

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

// UPDATE STOCK
exports.updateProductStock = async (req, res) => {
  try {
    const { productId } = req.params; 
    const {
      productCode,
      category,
      productName,
      totalQuantity,
      totalQuantityUnit,
      productCategory,
      variantType,
    } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId).populate("varient");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product details
    if (productCode) product.productCode = productCode;
    if (category) product.category = category;
    if (productName) product.productName = productName;
    if (productCategory) product.productCategory = productCategory;

    await product.save();

    // Update variant details
    if (product.varient) {
      const variant = await Variant.findById(product.varient);

      if (variant) {
        if (totalQuantity) variant.totalQuantity = totalQuantity;
        if (totalQuantityUnit) variant.totalQuantityUnit = totalQuantityUnit;
        if (variantType) variant.variantType = variantType;

        await variant.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Product and variant updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// UPDATE STATUS
exports.updateProductStatus = async (req, res) => {
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

