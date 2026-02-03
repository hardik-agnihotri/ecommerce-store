import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { isloggedIn } from "../middlewares/loggedInMiddleware";

const router = express.Router();

router.post("/cart/add",protect,isloggedIn,)


export default router;