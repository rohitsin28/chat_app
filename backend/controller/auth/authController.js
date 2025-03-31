import User from "../../models/userModel.js";
import helper from "../../utils/helper.js";

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!email || !password || !name)
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already exists" });

      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Please provide email and password" });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await helper.matchPassword(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = helper.createToken(user._id);

      return res.json({ message: "User logged in successfully", user, token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },
  allUsers: async (req, res) => {
    try {
      const keywords = req.query.search
        ? {
            $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};

      const users = await User.find(keywords).find({_id: {$ne: req.user.id}}).sort({ updatedAt: -1 });
      return res
        .status(200)
        .json({ message: "Successfully get users", users: users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },
};

export default authController;
