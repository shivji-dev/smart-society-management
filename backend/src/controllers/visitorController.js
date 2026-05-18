const Visitor = require("../models/Visitor");
const User = require("../models/User");
const client = require("../config/twilio");


// =============================
// Guard Add Visitor
// =============================

const addVisitor = async (req, res) => {
  try {

    const {
      name,
      phone,
      purpose,
      flatNumber
    } = req.body;

    // Check resident exists for flat

    const resident = await User.findOne({
      flatNumber,
      role: "resident"
    });

    if (!resident) {
      return res.status(404).json({
        message:
          "No resident found for this flat"
      });
    }

    // Create Visitor

    const visitor = await Visitor.create({
      name,
      phone,
      purpose,
      flatNumber,
      createdBy: req.user._id
    });

    // =============================
    // Socket Notification
    // =============================

    if (global.io) {

      global.io.to(
        resident._id.toString()
      ).emit(
        "newVisitor",
        {
          message:
            "New visitor arrived",
          visitor
        }
      );
    }

    // =============================
    // WhatsApp Notification
    // =============================

    try {

      await client.messages.create({

        from:
          process.env
            .TWILIO_WHATSAPP_NUMBER,

        to:
          `whatsapp:+91${resident.phone}`,

        body:
`🚨 Visitor Alert

Visitor Name: ${name}

Phone: ${phone}

Purpose: ${purpose}

Flat Number: ${flatNumber}

Please approve or reject visitor entry.`

      });

    } catch (twilioError) {

      console.log(
        "WhatsApp Error:",
        twilioError.message
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Visitor added successfully",
      visitor
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// Resident Approve / Reject
// =============================

const updateVisitorStatus =
async (req, res) => {

  try {

    const visitor =
      await Visitor.findById(
        req.params.id
      );

    if (!visitor) {
      return res.status(404).json({
        message:
          "Visitor not found"
      });
    }

    // Only same flat resident

    if (
      visitor.flatNumber !==
      req.user.flatNumber
    ) {

      return res.status(403).json({
        message:
          "Unauthorized access"
      });
    }

    // Update Status

    visitor.status =
      req.body.status;

    await visitor.save();

    // =============================
    // Socket Event
    // =============================

    if (global.io) {

      global.io.emit(
        "visitorStatusUpdated",
        {
          message:
            "Visitor status updated",
          visitor
        }
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Visitor status updated successfully",
      visitor
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// Get All Visitors
// =============================

const getVisitors = async (
  req,
  res
) => {

  try {

    let visitors;

    // Resident sees own flat visitors

    if (
      req.user.role === "resident"
    ) {

      visitors =
        await Visitor.find({
          flatNumber:
            req.user.flatNumber
        });

    }

    // Guard/Admin sees all

    else {

      visitors =
        await Visitor.find()
          .populate(
            "createdBy",
            "name email role"
          );
    }

    res.status(200).json({
      success: true,
      count: visitors.length,
      visitors
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  addVisitor,
  updateVisitorStatus,
  getVisitors
};