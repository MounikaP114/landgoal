import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json("User created successfully...");
  } catch (error) {
    next(error);
  }
};
