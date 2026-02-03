import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { compressImages } from "../middlewares/imageCompressMiddleware.js";

const router = express.Router();

router.post("/create-product",protect,isAdmin,upload.array("images", 5),compressImages,createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/products/:id",protect,isAdmin,upload.array("images", 5),compressImages,updateProduct);
router.delete("/products/:id",protect,isAdmin,deleteProduct);


export default router;