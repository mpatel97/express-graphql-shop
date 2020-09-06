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

  productCategory: async (args: any) => {
    try {
      return await ProductCategory.findById(args.productCategoryInput.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createProductCategory: async (args: any) => {
    let {
      name,
      description,
      parentProductCategory,
    } = args.productCategoryInput;
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
