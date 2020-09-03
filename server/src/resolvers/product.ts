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

  product: async (req: any) => {
    try {
      return await Product.findById(req.productInput.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createProduct: async (req: any) => {
    let { name, description } = req.productInput;

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
