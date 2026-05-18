const express = require("express");
const router = express.Router();

const {
  registerResident,
  loginUser,
  seedAdmin
} = require("../controllers/authController");


// Resident Register
router.post(
  "/register",
  registerResident
);

// Login (admin/guard/resident)
router.post(
  "/login",
  loginUser
);

// Create first admin
router.post(
  "/seed-admin",
  seedAdmin
);

module.exports = router;