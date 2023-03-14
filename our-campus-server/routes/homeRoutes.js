import express from "express";
import {
  getPosts
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(protect, getPosts);

export default router;