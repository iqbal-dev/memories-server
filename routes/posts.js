import express from "express";
import {
  createPosts,
  getPosts,
  updatedPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatedPost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
