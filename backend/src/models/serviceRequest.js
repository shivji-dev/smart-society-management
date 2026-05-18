const mongoose = require("mongoose");

const serviceRequestSchema =
  new mongoose.Schema(
    {
      resident: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      serviceType: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: [
          "pending",
          "in-progress",
          "completed"
        ],
        default: "pending"
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);