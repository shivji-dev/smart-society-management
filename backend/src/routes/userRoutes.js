const express = require("express");

const {
  createGuard,
  getAllUsers
} = require("../controllers/userController");

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/create-guard",
  protect,
  authorizeRoles("admin"),
  createGuard
);

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

module.exports = router;