import express from "express";

import {
  createContact,
  deleteContact,
  getAllContact,
  getContactById,
  updateContact,
} from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createContact);
router.get("/", verifyToken, getAllContact);
router.get("/:id", verifyToken, getContactById);
router.put("/:id", verifyToken, updateContact);
router.delete("/:id", verifyToken, deleteContact);
// router.post("/login", loginUser);
// router.get("/:id", verifyToken, getUser);
// router.put("/:id", verifyToken, updateUser);
// router.delete("/:id", verifyToken, deleteUser);

export default router;
