import ProductCategory from "../models/ProductCategory";

export default {
  productCategories: async () => {
    try {
      return await ProductCategory.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  productCategory: async (req: any) => {
    try {
      return await ProductCategory.findById(req.productCategoryInput.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createProductCategory: async (req: any) => {
    let { name, description, parentProductCategory } = req.productCategoryInput;
    const productCategory = new ProductCategory({
      name,
      description,
      parentProductCategory,
    });

    try {
      let result = await productCategory.save();
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
