import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const user = (req, res) => {
  res.json({
    msg: "hello dear",
  });
};
export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "forbidden"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser;
    res.status(201).json(rest);
  } catch (error) {
    error(error);
  }
};
