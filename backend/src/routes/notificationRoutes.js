const express = require("express");

const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
} = require(
  "../controllers/notificationController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// Create Notification
router.post(
  "/create",
  protect,
  createNotification
);


// Get Logged-in User Notifications
router.get(
  "/my",
  protect,
  getNotifications
);


// Mark as Read
router.put(
  "/read/:id",
  protect,
  markAsRead
);


// Delete Notification
router.delete(
  "/delete/:id",
  protect,
  deleteNotification
);

module.exports = router;