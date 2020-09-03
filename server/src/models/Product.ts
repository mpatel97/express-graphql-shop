import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default model("Product", ProductSchema);
