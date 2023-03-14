import express from "express";
import {
  // craeteEventComment,
  createEvent,
  deleteEvent,
  enrollEvents,
  getEventById,
  getEvents,
  getTopEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { protect, admin, staff } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, staff, createEvent);
// router.route("/:id/comments").post(protect, craeteEventComment);
router.get("/top", getTopEvents);
router.route("/:id").post(protect, getEvents).post(protect, staff, createEvent);

router
  .route("/:id")
  .get(getEventById)
  .delete(protect, staff, deleteEvent)
  .put(protect, staff, updateEvent);

router.route("/:id/enroll").post(protect, enrollEvents);

export default router;
