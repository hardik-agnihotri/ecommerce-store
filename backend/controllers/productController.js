import Product from "../models/productModel.js";


export const createProduct = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.compressedImages) {
      imageUrls = await uploadImagesToCloudinary(req.compressedImages);
    }

    const product = await Product.create({
      ...req.body,
      images: imageUrls
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    let filter = { isDeleted: false };

    if (category) {
      filter.category = category; // ObjectId or slug
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalProducts: total,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedImages = product.images;

    if (req.compressedImages?.length > 0) {
      // delete old images
      await deleteImagesFromCloudinary(product.images);

      // upload new ones
      updatedImages = await uploadImagesToCloudinary(req.compressedImages);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: updatedImages
      },
      { new: true }
    );

    res.json({
      success: true,
      updatedProduct
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    // remove images from cloudinary
    await deleteImagesFromCloudinary(product.images);

    product.isDeleted = true;
    product.images = [];
    await product.save();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
