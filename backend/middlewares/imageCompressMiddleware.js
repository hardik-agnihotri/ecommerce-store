import sharp from "sharp";

export const compressImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    const compressedImages = await Promise.all(
      req.files.map(async (file) => {
        const buffer = await sharp(file.buffer)
          .resize(800) // good for products
          .jpeg({ quality: 70 }) // compression level
          .toBuffer();

        return {
          buffer,
          originalname: file.originalname
        };
      })
    );

    req.compressedImages = compressedImages;
    next();
  } catch (error) {
    next(error);
  }
};
