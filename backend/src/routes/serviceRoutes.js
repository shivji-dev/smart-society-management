const express = require("express");

const {
  createServiceRequest,
  updateServiceStatus,
  getServiceRequests
} = require(
  "../controllers/serviceController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const router = express.Router();


// Resident creates request

router.post(
  "/create",
  protect,
  authorizeRoles("resident"),
  createServiceRequest
);


// Admin updates request

router.put(
  "/update/:id",
  protect,
  authorizeRoles("admin"),
  updateServiceStatus
);


// Get all requests

router.get(
  "/all",
  protect,
  getServiceRequests
);

module.exports = router;