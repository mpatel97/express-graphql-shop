import User from "../models/User";

export default {
  users: async () => {
    try {
      return await User.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  user: async (req: any) => {
    try {
      return await User.findById(req.userInput.id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createUser: async (req: any) => {
    let { firstName, lastName, email, password } = req.userInput;
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    try {
      let result = await user.save();
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
