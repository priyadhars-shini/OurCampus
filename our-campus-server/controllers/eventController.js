import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

//@desc     Fetch all posts
//@route    Get /posts
//@access   Public
const getEvents = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const events = await Event.find({ ...keyword });

  res.json({ events });
});

//@desc     Fetch single event
//@route    Get /posts/:id
//@access   Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

//@desc     Delete a event
//@route    DELETE /posts/:id
//@access   Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    await event.remove();
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

//@desc     create a event
//@route    POST /posts
//@access   Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { username, image, caption } = req.body.event;
  const event = new Event({
    username,
    image,
    caption,
    admins: [],
    enrolled: [],
  });

  const createdProduct = await event.save();
  res.status(201).json(createdProduct);
});

//@desc     Update a event
//@route    PUT /posts/:id
//@access   Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { caption } = req.body.event;
  const event = await Event.findById(req.params.id);

  if (event) {
    event.caption = caption;
    const updatedPost = await event.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

//@desc     Create a review
//@route    POST /posts/:id/comments
//@access   Private
// const craeteEventComment = asyncHandler(async (req, res) => {
//   const { comment } = req.body;
//   const event = await Event.findById(req.params.id);

//   if (event) {
//     // const alreadyReviewed = event.comments.find(
//     //   (r) => r.user.toString() === req.user._id.toString()
//     // );
//     // if (alreadyReviewed) {
//     //   res.status(400);
//     //   throw new Error("Event already reviewed");
//     // }

//     const review = {
//       name: req.user.name,
//       comment,
//       user: req.user._id,
//     };

//     event.comments.push(review);

//     event.numComments = event.comments.length;

//     // event.rating =
//     //   event.reviews.reduce((acc, item) => item.rating + acc, 0) /
//     //   event.reviews.length;

//     await event.save();
//     res.status(201).json({ message: "Review Added" });
//   } else {
//     res.status(404);
//     throw new Error("Event not found");
//   }
// });

//@desc     Get top rated Products
//@route    GET /posts/top
//@access   Public
const getTopEvents = asyncHandler(async (req, res) => {
  const posts = await Event.find({}).sort({ numComments: 1 }).limit(3);
  res.json(posts);
});

const enrollEvents = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  const user = await User.findById(req.body.userId);

  console.log(req.params.id+" ", req.body.userId)

  if (event) {
    event.enrolled.push(req.body.userId);
    if (user) {
      user.joinedEvents.push(req.params.id);
      const updatedUser = await user.save();
      await event.save();
      res.status(200);
      res.json(updatedUser);
    } else {
      res.status(404);
    throw new Error("Invalid User");
    }
  } else {
    res.status(404);
    throw new Error("Invalid Event");
  }
});

export {
  enrollEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEvents,
  // craeteEventComment,
  getTopEvents,
};
