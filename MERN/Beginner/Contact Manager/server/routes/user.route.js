import express from "express";
import {
  createUser,
  deleteUser,
  getMe,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", verifyToken, getUser);
router.get("/me", verifyToken, getMe);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
