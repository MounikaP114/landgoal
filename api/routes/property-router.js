import express from "express";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  getProperty,
<<<<<<< HEAD
  getPropertys,
=======
  
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b
} from "../controllers/property-controller.js";
import { verifyToken } from "../utils/verifyuser.js";
const router = express.Router();

router.post("/create", verifyToken, createProperty);
router.delete("/delete/:id", verifyToken, deleteProperty);
router.post("/update/:id", verifyToken, updateProperty);
router.get("/get/:id", getProperty);
<<<<<<< HEAD
router.get("/get", getPropertys);
=======
// router.get("/get", getPropertys);
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b

export default router;
