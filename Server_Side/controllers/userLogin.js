const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userRegister.model"); // Adjust path if needed

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).json({
      message: "Server error",
      error: error.message, // Helpful for debugging
    });
  }
};

module.exports = userLogin;
