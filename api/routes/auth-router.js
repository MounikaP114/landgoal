import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth-controller.js";
import { createProperty } from "../controllers/property-controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
router.post("/create", createProperty);
export default router;
