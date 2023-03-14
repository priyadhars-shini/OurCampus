import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  img: { type: String, require: true },
  url: { type: String, required: true },
  msg: { type: String, required: true },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    about: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    respect: {
      type: Number,
      required: true,
    },
    userType: {
      // 0 - all, 1 - student, 2 - staff, 3 - admin
      type: Number,
      required: true,
    },
    skills: [{ type: Number }],
    hobbies: [{ type: String }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    home: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    notifications: [notificationSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
