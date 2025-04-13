const bcrypt = require("bcryptjs");
const User = require("../models/userRegister.model");

const userRegister = async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, age, email, password: hashed }); // ✅ Include age
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = userRegister;
