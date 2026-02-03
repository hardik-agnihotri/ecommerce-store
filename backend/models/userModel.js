import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: [
      {
        phone: {
          type: String,
          trim: true,
        },
        pincode: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        street: {
          type: String,
          trim: true,
        },
        state: {
          type: String,
          trim: true,
        },
        country: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
