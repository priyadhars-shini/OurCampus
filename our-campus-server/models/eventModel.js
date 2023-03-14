import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
    },
    image:{
      type: String,
      required: true,
    },
    caption:{
      type: String,
      required: true,
    },
    numComments:{
      type: Number,
    },
    admins:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}],
    enrolled:[{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;