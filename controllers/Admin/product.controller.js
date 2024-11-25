const Product = require('../../models/Product');
const Variant = require('../../models/Varient');

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const {
      productCode,
      category,
      productName,
      gst,
      photos,
      status,
      isActive,
      averageRating,
      reviewCount,
      variants,
      totalQuantity,
      totalQuantityUnit,
    } = req.body;

    // Create the product
    const product = new Product({
      productCode,
      category,
      productName,
      gst,
      photos,
      status,
      isActive,
      averageRating,
      reviewCount,
    });

    // Save the product in the database
    const savedProduct = await product.save();

    // Prepare the variants data
    const variantData = variants.map((variant) => {
      const sku = generateSku(productCode, variant.variantType, variant.value);
      return {
        sku,
        value: variant.value,
        unit: variant.unit,
        price: variant.price,
        mlmPrice: variant.mlmPrice,
        referralPrice: variant.referralPrice,
        normalPrice: variant.normalPrice,
      };
    });

    // Create and save the variant associated with the product
    const variant = new Variant({
      productId: savedProduct._id,
      variantType: variants[0].variantType, // Assuming variants have the same type
      variants: variantData,
      totalQuantity,
      totalQuantityUnit,
    });

    await variant.save();

    res.status(201).json({
      message: 'Product and variants created successfully',
      product: savedProduct,
      variant,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// SKU generation function
const generateSku = (productCode, variantType, variantValue) => {
  // Generate SKU as "PRODUCTCODE-VARIANTTYPE-VALUE"
  return `${productCode}-${variantType}-${variantValue}`.toUpperCase();
};

module.exports = {
  createProduct,
};
