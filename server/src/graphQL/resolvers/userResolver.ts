import User from "../models/User";
import { hash, compare } from "bcryptjs";

export default {
  register: async (args: any) => {
    const { firstName, lastName, email, password } = args.userInput;

    try {
      const existingUser = await User.findOne({ email });

      // Ensure new user must have unique email
      if (existingUser !== null) {
        throw new Error("User already exists");
      }

      const user = new User({
        firstName,
        lastName,
        email,
        password: await hash(password, 12),
      });

      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  currentUser: async (_args: any, req: any) => {
    // Check if userId set in session cookie
    if (!req.session.userId) {
      return null;
    }
    return await User.findById(req.session.userId);
  },

  login: async (args: any, req: any) => {
    const { email, password } = args;
    const user: any = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid user credentials!");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid user credentials!");
    }

    // Set userId in session cookie
    req.session.userId = user.id;
    return user;
  },
};
