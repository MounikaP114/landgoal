import User from "../models/user-model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json("User created successfully...");

  } catch (error) {
    res.status(500).json(error.message)
  }
  
  
};