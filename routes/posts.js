import express from "express";
import {
  createPosts,
  getPosts,
  updatedPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatedPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
