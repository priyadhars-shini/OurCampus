import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    name: {type:String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    comment:{type: String, required: true},
  }
);

const postSchema = mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
    },
    image:{
      type: String,
      required: true,
    },
    dp:{
      type: String,
      required: true,
    },
    caption:{
      type: String,
    },
    numComments:{
      type:Number,
    },
    likes:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}],
    comments:[commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;