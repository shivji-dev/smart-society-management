const express = require("express");

const {
  addVisitor,
  updateVisitorStatus,
  getVisitors
} = require("../controllers/visitorController");

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/add",
  protect,
  authorizeRoles("guard"),
  addVisitor
);

router.put(
  "/update/:id",
  protect,
  authorizeRoles("resident"),
  updateVisitorStatus
);

router.get(
  "/all",
  protect,
  getVisitors
);

module.exports = router;