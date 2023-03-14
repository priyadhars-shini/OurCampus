import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cron from "node-cron";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import messageRoutes from "./routes/message.js";
import { refreshUsers } from "./controllers/userController.js";
import chatRoutes from "./routes/chat.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

cron.schedule("0 0 * * *", () => {
  refreshUsers();
  console.log("Refreshed Users");
});

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/posts", postRoutes);
app.use("/home", homeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/v1/chat", protect, chatRoutes);
app.use("/api/v1/message", protect, messageRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/our-campus-client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "our-campus-client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server Started Successfully!");
  });
}
const PORT = process.env.PORT || 5000;

const server = createServer(app);

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, async () => {
      await refreshUsers();
      console.log(`Server running @ port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //connected to correct id
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
