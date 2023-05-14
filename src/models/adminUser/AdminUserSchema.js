import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: "",
    },
    address: {
      type: String,
      required: "",
    },
    isEmailVerified: {
      type: Boolean,
      required: false,
    },
    verificationCode: {
      type: String,
      required: null,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("strictQuery", false);
export default mongoose.model("Admin_user", adminSchema);
