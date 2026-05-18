const Notification = require(
  "../models/Notification"
);


// Create Notification

const createNotification = async (
  req,
  res
) => {
  try {
    const {
      title,
      message,
      type,
      recipient
    } = req.body;

    const notification =
      await Notification.create({
        title,
        message,
        type,
        recipient
      });

    if (global.io) {
      global.io.emit(
        "newNotification",
        notification
      );
    }

    res.status(201).json({
      success: true,
      notification
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get User Notifications

const getNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({
        recipient: req.user._id
      }).sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Mark Notification as Read

const markAsRead = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {
      return res.status(404).json({
        message:
          "Notification not found"
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      notification
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Delete Notification

const deleteNotification = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {
      return res.status(404).json({
        message:
          "Notification not found"
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Notification deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};