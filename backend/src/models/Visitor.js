const mongoose = require("mongoose");

const visitorSchema =
new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  purpose: {
    type: String,
    required: true
  },

  flatNumber: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected"
    ],
    default: "pending"
  },

  createdBy: {
    type:
mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
"Visitor",
visitorSchema
);