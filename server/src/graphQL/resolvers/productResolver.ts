import Product from "../models/Product";

export default {
  products: async () => {
    try {
      return await Product.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  product: async (args: any) => {
    try {
      return await Product.findById(args.productInput.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createProduct: async (args: any) => {
    let { name, description } = args.productInput;

    const product = new Product({
      name,
      description,
    });

    try {
      let result = await product.save();
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
