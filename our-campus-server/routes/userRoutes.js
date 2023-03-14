import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  requestUser,
  acceptUser,
  declineUser,
  unRequestUser,
  getMessageUsers,
  developerUsers,
  refreshUsers,
  searchUser,
} from "../controllers/userController.js";

router.route("/developers").get(developerUsers);
router.route("/chat").get(protect, searchUser);
router.route("/refresh").get(protect, admin, refreshUsers);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser);

router.route("/:id/request").post(protect, requestUser);
router.route("/:id/unrequest").post(protect, unRequestUser);
router.route("/:id/accept").post(protect, acceptUser);
router.route("/:id/decline").post(protect, declineUser);

router.route("/messages").get(getMessageUsers);

export default router;
