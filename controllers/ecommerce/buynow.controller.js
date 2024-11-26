exports.buyNow = async (req, res, next) => {
  try {
    const {productId,variantId,variantSku} = req.body
  } catch (error) {
    next(error);
  }
};
