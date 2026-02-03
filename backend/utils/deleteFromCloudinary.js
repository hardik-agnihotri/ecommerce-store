import cloudinary from "../config/cloudinary.js";

export const deleteImagesFromCloudinary = async (imageUrls) => {
  for (const url of imageUrls) {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.v2.uploader.destroy(`products/${publicId}`);
  }
};
