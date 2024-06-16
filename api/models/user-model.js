
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim:true,
      required: true,
      unique: true,
      
    },
    email: {
      type: String,
      trim:true,
      required: true,
      unique: true,
      lowarcase:true,
    },
    password: {
      type: String,
      required: true,
      
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
