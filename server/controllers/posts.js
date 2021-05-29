import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// status code: 1xx informational, 2xx succes, 3xx redirection, 4xx client error
// 5xx server error
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (e) {
    res.status(404).json({message: e.message});
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({message: e.message});
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No Post Found');

  
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { ...post, _id}, { new: true });

  res.json(updatePost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("post not found");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'post deleted' });
}


