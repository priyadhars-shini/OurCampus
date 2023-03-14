import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
import { getPostUsingId } from "./postController.js";
import {
  recommendationSystem,
  recommendationForUser,
} from "../recommender/index.js";
import { initialize } from "../recommender/recommender.js";

const getUserByIds = asyncHandler(async (userIds) => {
  const user = await User.find()
    .where("_id")
    .sort({ _id: -1 })
    .in(userIds)
    .exec();
  return user;
});

const getUserByUsername = asyncHandler(async (usernames) => {
  const user = await User.find()
    .where("username")
    .sort({ _id: -1 })
    .in(usernames)
    .exec();
  return user;
});

const developerUsers = asyncHandler(async (req, res) => {
  const developers = ["19eucb058", "19eucb045", "19eucb007"];
  const devDetails = await getUserByUsername(developers);
  console.log(devDetails);
  res.json(devDetails);
  res.status(200);
});

const refreshUsers = asyncHandler(async () => {
  const users = await User.find({});
  const posts = await Post.find({});
  const recommender = await recommendationSystem(users, posts);
  // const { knnClassifier, cf } = initialize(users);
  users.forEach(async (user) => {
    user.home = [];
    // recommendActivities(knnClassifier, cf, user);
    user.suggestions = await recommendationForUser(recommender, user);
    console.log(user.username + " : " + user.suggestions);
    user.suggestions = await user.suggestions.filter(
      (u) => u !== user._id && !user.following.includes(u)
    );
    // user.suggestions = await User.find({ _id: { $ne: user._id } }, { _id: 1 })
    //   .sort({ _id: -1 })
    //   .limit(5);
    await user.save();
  });
  console.log("Users Refreshed");
});

//@desc     Auth user & get token
//@route    POST /users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne().where("username").equals(username).exec();

  if (user) {
    const home = await getPostUsingId(user.home);
    const posts = await getPostUsingId(user.posts);
    const suggestions = await getUserByIds(user.suggestions);

    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      dp: user.dp,
      tagline: user.tagline,
      about: user.about,
      rating: user.rating,
      respect: user.respect,
      userType: user.userType,
      skills: user.skills,
      hobbies: user.hobbies,
      followers: user.followers,
      following: user.following,
      requests: user.requests,
      requested: user.requested,
      notifications: user.notifications,
      suggestions,
      joinedEvents: user.joinedEvents,
      hostedEvents: user.hostedEvents,
      posts,
      home,
      clubs: user.clubs,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username");
  }
});

//@desc     Register  New user
//@route    POST /users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, userType } = req.body;
  const userExsists = await User.findOne({ username });

  if (userExsists) {
    // authUser(req, res);
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      username,
      userType,
      dp: "/images/default.jpg",
      tagline: "",
      about: "",
      rating: 2.5,
      respect: 0,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        name: user.name,
        dp: user.dp,
        tagline: user.tagline,
        about: user.about,
        rating: user.rating,
        respect: user.respect,
        userType: user.userType,
        skills: user.skills,
        hobbies: user.hobbies,
        followers: user.followers,
        following: user.following,
        requests: user.requests,
        requested: user.requested,
        notifications: user.notifications,
        suggestions: user.suggestions,
        joinedEvents: user.joinedEvents,
        hostedEvents: user.hostedEvents,
        posts: user.posts,
        home: user.home,
        clubs: user.clubs,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid user Data");
    }
  }
});

//@desc     Get user profile
//@route    GET /users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      dp: user.dp,
      tagline: user.tagline,
      about: user.about,
      rating: user.rating,
      respect: user.respect,
      userType: user.userType,
      skills: user.skills,
      hobbies: user.hobbies,
      followers: user.followers,
      following: user.following,
      requests: user.requests,
      requested: user.requested,
      notifications: user.notifications,
      suggestions: user.suggestions,
      joinedEvents: user.joinedEvents,
      hostedEvents: user.hostedEvents,
      posts: user.posts,
      home: user.home,
      clubs: user.clubs,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Update user profile
//@route    PUT /users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const user = await User.findById(req.body._id);

  if (user) {
    (user.username = req.body.username || user.username),
      (user.name = req.body.name || user.name),
      (user.dp = req.body.dp || user.dp),
      (user.tagline = req.body.tagline || user.tagline),
      (user.about = req.body.about || user.about),
      (user.rating = req.body.rating || user.rating),
      (user.respect = req.body.respect || user.respect),
      (user.userType = req.body.userType || user.userType),
      (user.skills = req.body.skills || user.skills),
      (user.hobbies = req.body.hobbies || user.hobbies),
      (user.followers = req.body.followers || user.followers),
      (user.following = req.body.following || user.following),
      (user.requests = req.body.requests || user.requests),
      (user.requested = req.body.requested || user.requested),
      (user.suggestions = req.body.suggestions || user.suggestions),
      (user.joinedEvents = req.body.joinedEvents || user.joinedEvents),
      (user.hostedEvents = req.body.hostedEvents || user.hostedEvents),
      (user.posts = req.body.posts || user.posts),
      (user.home = req.body.home || user.home),
      (user.clubs = req.body.clubs || user.clubs),
      (user.notifications = req.body.notifications || user.notifications);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      dp: updatedUser.dp,
      tagline: updatedUser.tagline,
      about: updatedUser.about,
      rating: updatedUser.rating,
      respect: updatedUser.respect,
      userType: updatedUser.userType,
      skills: updatedUser.skills,
      hobbies: updatedUser.hobbies,
      followers: updatedUser.followers,
      following: updatedUser.following,
      requests: updatedUser.requests,
      requested: updatedUser.requested,
      notifications: user.notifications,
      suggestions: updatedUser.suggestions,
      joinedEvents: updatedUser.joinedEvents,
      hostedEvents: updatedUser.hostedEvents,
      posts: updatedUser.posts,
      home: updatedUser.home,
      clubs: updatedUser.clubs,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Get all users
//@route    GET /users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Delete user
//@route    DELETE /users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Get user by id
//@route    GET /users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const username = req.params.id;
  const user = await User.findOne({ username });
  const posts = await getPostUsingId(user.posts);
  user.posts = posts;
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc     Update user
//@route    PUT /users/:id
//@access   Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    (user.username = req.body.username || user.username),
      (user.name = req.body.name || user.name),
      (user.dp = req.body.dp || user.dp),
      (user.tagline = req.body.tagline || user.tagline),
      (user.about = req.body.about || user.about),
      (user.rating = req.body.rating || user.rating),
      (user.respect = req.body.respect || user.respect),
      (user.userType = req.body.userType || user.userType),
      (user.skills = req.body.skills || user.skills),
      (user.hobbies = req.body.hobbies || user.hobbies),
      (user.followers = req.body.followers || user.followers),
      (user.following = req.body.following || user.following),
      (user.requests = req.body.requests || user.requests),
      (user.requested = req.body.requested || user.requested),
      (user.suggestions = req.body.suggestions || user.suggestions),
      (user.joinedEvents = req.body.joinedEvents || user.joinedEvents),
      (user.hostedEvents = req.body.hostedEvents || user.hostedEvents),
      (user.posts = req.body.posts || user.posts),
      (user.home = req.body.home || user.home),
      (user.clubs = req.body.clubs || user.clubs),
      (user.notifications = req.body.notifications || user.notifications);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      dp: updatedUser.dp,
      tagline: updatedUser.tagline,
      about: updatedUser.about,
      rating: updatedUser.rating,
      respect: updatedUser.respect,
      userType: updatedUser.userType,
      skills: updatedUser.skills,
      hobbies: updatedUser.hobbies,
      followers: updatedUser.followers,
      following: updatedUser.following,
      requests: updatedUser.requests,
      requested: updatedUser.requested,
      notifications: updateUser.notifications,
      suggestions: updatedUser.suggestions,
      joinedEvents: updatedUser.joinedEvents,
      hostedEvents: updatedUser.hostedEvents,
      posts: updatedUser.posts,
      home: updatedUser.home,
      clubs: updatedUser.clubs,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const requestUser = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const friendName = req.params.id;

  if (username === friendName) {
    res.status(404);
    throw new Error("User cannot request himself");
  }

  const user = await User.findOne().where("username").equals(username).exec();
  const friend = await User.findOne()
    .where("username")
    .equals(friendName)
    .exec();

  console.log(user.username + " " + friend.username);

  if (user && friend) {
    user.requested.push(friend._id);
    friend.requests.push(user._id);

    let notification = {
      url: `/profile/${user.username}`,
      img: user.dp,
      msg: user.name + " has requested to follow you.",
    };

    friend.notifications.push(notification);

    const updatedUser = await user.save();
    await friend.save();

    // console.log(updatedUser)
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const acceptUser = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const friendName = req.params.id;

  const user = await User.findOne().where("username").equals(username).exec();
  const friend = await User.findOne()
    .where("username")
    .equals(friendName)
    .exec();

  if (user && friend) {
    user.requests.remove(friend._id);
    user.followers.push(friend._id);
    friend.requested.remove(user._id);
    friend.following.push(user._id);

    let notification = {
      url: `/profile/${user.username}`,
      img: user.dp,
      msg: user.name + " has Accepted your follow request.",
    };

    friend.notifications.push(notification);

    // friend.home.push(user.posts);
    await user.save();
    await friend.save();
    // console.log(user.username);
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const unRequestUser = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const friendName = req.params.id;

  const user = await User.findOne().where("username").equals(username).exec();
  const friend = await User.findOne()
    .where("username")
    .equals(friendName)
    .exec();

  if (user && friend) {
    user.requested.remove(friend._id);
    friend.requests.remove(user._id);
    await user.save();
    await friend.save();
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const declineUser = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const friendName = req.params.id;

  const user = await User.findOne().where("username").equals(username).exec();
  const friend = await User.findOne()
    .where("username")
    .equals(friendName)
    .exec();

  if (user && friend) {
    user.requests.remove(friend._id);
    friend.requested.remove(user._id);
    await user.save();
    await friend.save();
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getMessageUsers = asyncHandler(async (req, res) => {
  try {
    let id = mongoose.Types.ObjectId(req.body.userInfo._id);

    User.aggregate()
      .match({ _id: { $not: { $eq: id } } })
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end({ message: "Failure" });
          res.sendStatus(500);
        } else {
          res.send(users);
        }
      });
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.end({ message: "Unauthorized" });
    res.sendStatus(401);
  }
});

const searchUser = async (req, res) => {
  const { search } = req.query;

  const user = await User.find({
    username: { $regex: search, $options: "i" },
  }).select("username name _id dp tagline");

  res.status(200).json(user);
};

export {
  requestUser,
  acceptUser,
  declineUser,
  unRequestUser,
  getUserById,
  updateUser,
  registerUser,
  deleteUser,
  getUsers,
  updateUserProfile,
  authUser,
  getUserProfile,
  refreshUsers,
  getMessageUsers,
  developerUsers,
  searchUser,
};
