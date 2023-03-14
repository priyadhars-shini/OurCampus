import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const latestPosts = asyncHandler(async () => {
  // const posts = await Post.find({ $where: function () { return Date.now() - this._id.getTimestamp() < (24 * 60 * 60 * 1000)  } });
});

const getPostUsingId = asyncHandler(async (postIds) => {
  const post = await Post.find()
    .where("_id")
    .sort({ _id: -1 })
    .in(postIds)
    .exec();
  // console.log(post);
  // const suggestions = await (await User.find().where('_id')).includes(user.suggestions).exec();
  return post;
});

//@desc     Fetch all posts
//@route    Get /posts
//@access   Public
const getPosts = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  const home = await Post.find().where("_id").in(user.home).exec();
  const suggestions = await (await User.find().where("_id"))
    .includes(user.suggestions)
    .exec();

  res.json({ home, suggestions, user });
});

//@desc     Fetch single post
//@route    Get /posts/:id
//@access   Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Delete a post
//@route    DELETE /posts/:id
//@access   Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { username } = req.headers;
  if (post && post.username === username) {
    await post.remove();
    const user = await User.findOne({ username });
    user.posts.remove(post._id);
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     create a post
//@route    POST /posts
//@access   Protect
const createPost = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { username, image, caption, dp } = req.body;
  const post = new Post({
    username,
    image,
    caption,
    likes: [],
    dp,
  });
  const user = await User.findOne({ username });
  if (user) {
    const createdProduct = await post.save();
    user.posts.push(createdProduct._id);
    await user.save();

    user.followers.forEach(async (follower) => {
      const friend = await User.findById(follower);
      friend.home.push(post._id);
      await friend.save();
    });

    res.status(201).json(createdProduct);
  }
});

//@desc     Update a post
//@route    PUT /posts/:id
//@access   Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.caption = caption;
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Create a review
//@route    POST /posts/:id/comments
//@access   Private
const craetePostComment = asyncHandler(async (req, res) => {
  const { comment, userId, username } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    // const alreadyReviewed = post.comments.find(
    //   (r) => r.user.toString() === req.user._id.toString()
    // );
    // if (alreadyReviewed) {
    //   res.status(400);
    //   throw new Error("Post already reviewed");
    // }

    const review = {
      name: username,
      comment,
      user: userId,
    };

    post.comments.push(review);

    post.numComments = post.comments.length;

    await post.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc     Get top rated Products
//@route    GET /posts/top
//@access   Public
const getTopPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ rating: -1 }).limit(3);
  res.json(posts);
});

const likePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.body._id;

  console.log(req.params)
  if (postId && userId) {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      res.status(200);
      res.json(post);
    } else {
      res.status(404);
      throw new Error("Post Already Liked");
    }
  } else {
    res.status(404);
    throw new Error("Post not Found");
  }
});

const unLikePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.body._id;

  if (postId && userId) {
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      post.likes.remove(userId);
      await post.save();
      res.json(post);
    }else {
      res.status(404);
      throw new Error("Post not Found");
    }
  } else {
    res.status(404);
    throw new Error("Post not liked yet");
  }
});

export {
  latestPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  craetePostComment,
  getTopPost,
  getPostUsingId,
  likePost,
  unLikePost,
};
