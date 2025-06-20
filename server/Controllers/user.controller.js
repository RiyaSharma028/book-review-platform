import { User } from "../models/user.model.js"

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {getUserById};

 const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check if any field is missing
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // create and save new user
    const newUser = new User({ fullname, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: savedUser._id,
        fullmame: savedUser.fullname,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {createUser};

 const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;

    // 1. Find user by ID
    const user = await User.findById(req.params.id);

    // 2. If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Update the fields (if provided)
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;

    // 4. Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: {
        _id: updatedUser._id,
        fullname: updatedUser.fullName,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {updateUserProfile};