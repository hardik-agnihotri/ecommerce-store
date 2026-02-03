import { z } from "zod";

export const productSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters"),

    description: z
      .string()
      .trim()
      .optional(),

    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),

    price: z
      .number()
      .min(0, "Price must be greater than or equal to 0"),

    discountedPrice: z
      .number()
      .min(0, "Discounted price must be >= 0")
      .optional(),

    weight: z
      .number()
      .min(0, "Weight must be >= 0")
      .optional(),

    metalType: z.enum([
      "Gold",
      "Silver",
      "Diamond",
      "Artificial",
    ]),

    stock: z
      .number()
      .min(0, "Stock cannot be negative")
      .optional(),

    purity: z.enum(["22k", "18k"]).optional(),

    images: z
      .array(z.string())
      .optional(),

    isFeatured: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
