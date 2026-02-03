import cloudinary from "../config/cloudinary.js";

export const uploadImagesToCloudinary = async (images) => {
  const uploadedImages = [];

  for (const image of images) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(image.buffer);
    });

    uploadedImages.push(result.secure_url);
  }

  return uploadedImages;
};
