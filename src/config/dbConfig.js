import mongoose from "mongoose";

export const connectDb = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
  } catch (error) {
    console.log(error);
  }
};
