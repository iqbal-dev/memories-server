import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updatedPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id");
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "post Delete Successfully" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  if (!req.userId) return res.json({ message: "Unauthorized" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with this id");

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== req.userId);
  }
  const updateLike = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updateLike);
};
