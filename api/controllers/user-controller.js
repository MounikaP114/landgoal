import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const user = (req, res) => {
  res.json({
    msg: "hello dear",
  });
};
export const updateUserInfo = async (req, res, next) => {
  console.log(req.user.id, req.params.id);
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "login with your account"));

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

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, " You  can only able to  delete  your own account")
    );
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token");
  res.status(200).json("User account deleted successfully");
};
