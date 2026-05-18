const ServiceRequest =
  require("../models/ServiceRequest");


// Resident creates service request

const createServiceRequest =
  async (req, res) => {
    try {
      const {
        serviceType,
        description
      } = req.body;

      const request =
        await ServiceRequest.create({
          resident: req.user._id,
          serviceType,
          description
        });

      if (global.io) {
        global.io.emit(
          "newServiceRequest",
          request
        );
      }

      res.status(201).json({
        success: true,
        message:
          "Service request created",
        request
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// Admin updates service status

const updateServiceStatus =
  async (req, res) => {
    try {
      const request =
        await ServiceRequest.findById(
          req.params.id
        );

      if (!request) {
        return res
          .status(404)
          .json({
            message:
              "Service request not found"
          });
      }

      request.status =
        req.body.status;

      await request.save();

      if (global.io) {
        global.io.emit(
          "serviceStatusUpdated",
          request
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Service status updated",
        request
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// Get all service requests

const getServiceRequests =
  async (req, res) => {
    try {
      const requests =
        await ServiceRequest.find()
          .populate(
            "resident",
            "name email flatNumber"
          );

      res.status(200).json({
        success: true,
        requests
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

module.exports = {
  createServiceRequest,
  updateServiceStatus,
  getServiceRequests
};