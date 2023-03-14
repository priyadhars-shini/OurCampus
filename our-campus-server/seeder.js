import dotenv from "dotenv";
import users from "./data/users.js";
import posts from "./data/posts.js";
import events from "./data/events.js";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import Event from "./models/eventModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Event.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePost = posts.map((post) => {
      return { ...post, user: adminUser };
    });

    const sampleEvent = events.map((event) => {
      return { ...event, user: adminUser };
    });

    await Post.insertMany(samplePost);
    await Event.insertMany(sampleEvent);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Event.deleteMany();
    await Post.deleteMany();
    await User.deleteMany({
      created_on: {
        $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    });

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
