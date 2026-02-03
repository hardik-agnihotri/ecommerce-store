import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { isloggedIn } from "../middlewares/loggedInMiddleware";
import { addToCart, getCart } from "../controllers/cartController";

const router = express.Router();

router.post("/cart/add",protect,isloggedIn,addToCart);
router.get("/cart",protect,isloggedIn,getCart);
router.delete("/cart/:productId",protect,isloggedIn,removeItem);


export default router;