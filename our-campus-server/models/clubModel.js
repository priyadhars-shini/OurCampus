import mongoose from "mongoose";

const clubSchema = mongoose.Schema(
  {
    dp:{
      type: String,
      required: true,
    },
    mission:{
      type: String,
      required: true,
    },
    vision:{
      type: String,
      required: true,
    },
    about:{
      type: String,
      required: true,
    },
    eligibility:{
        userType:{
          type:String,
        },
        respect:{
          type:Number,
        },
    },
    caption:{
      type: String,
      required: true,
    },
    admins:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}],
    members:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}],
    events:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event"}],
    posts:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post"}],
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;