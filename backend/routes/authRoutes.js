import express from "express";
import { login, register } from "../controllers/authController.js";
import { validate } from "../middlewares/zodValidate.js";
import { loginSchema, signupSchema } from "../zod-schema/authSchema.js";

const router = express.Router();

router.post("/register",validate(signupSchema),register);
router.post("/login",validate(loginSchema),login);

export default router;