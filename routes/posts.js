import express from "express";
import {
  createPosts,
  deletePost,
  getPost,
  getPostBySearch,
  getPosts,
  likePost,
  updatedPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatedPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
