import express from "express";
import {
  updateUserInfo,
  user,
  deleteUserInfo,
  getUserListProperties,
} from "../controllers/user-controller.js";
import { verifyToken } from "../utils/verifyuser.js";
const router = express.Router();
router.get("/user", user);
router.post("/update/:id", verifyToken, updateUserInfo);
router.delete("/delete/:id", verifyToken, deleteUserInfo);
router.get("/properties-list/:id", verifyToken, getUserListProperties);


export default router;
