import { Schema, model, Types } from "mongoose";

const ProductCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parentProductCategory: { type: Types.ObjectId, ref: "ProductCategory" },
});

export default model("ProductCategory", ProductCategorySchema);
