import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      min: 0,
    },

    weight: {
      type: Number,
      min: 0,
    },

    metalType: {
      type: String,
      enum: ["Gold", "Silver", "Diamond", "Artificial"],
      required: true,
    },

    stock: {
      type: Number,
      min: 0,
      default: 0,
    },

    purity: {
      type: String,
      enum: ["22k", "18k"],
    },

    images: [
      {
        type: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
