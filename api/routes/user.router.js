import express from "express";
import { updateUserInfo, user } from "../controllers/user-controller.js";
import { verifyUser } from "../utils/verifyuser.js";
const router = express.Router();
router.get("/user", user);
router.post("/update/:id", verifyUser, updateUserInfo);

export default router;
