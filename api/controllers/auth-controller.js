import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return res.status(404).json("User not Found!!");

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return res.status(401).json("Wrong Credentials");
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const{password:pass, ...rest}=validUser._doc
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json("Okay, Valid user!!!");
  } catch (rest) {
    next(error);
  }
};
