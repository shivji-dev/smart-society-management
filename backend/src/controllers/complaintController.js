const Complaint = require(
  "../models/Complaint"
);


// Resident raises complaint

const createComplaint = async (
  req,
  res
) => {
  try {
    const {
      title,
      description
    } = req.body;

    const complaint =
      await Complaint.create({
        title,
        description,
        resident: req.user._id
      });

    if (global.io) {
      global.io.emit(
        "newComplaint",
        complaint
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Complaint created successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Admin updates complaint status

const updateComplaintStatus =
  async (req, res) => {
    try {
      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {
        return res
          .status(404)
          .json({
            message:
              "Complaint not found"
          });
      }

      complaint.status =
        req.body.status;

      await complaint.save();

      if (global.io) {
        global.io.emit(
          "complaintUpdated",
          complaint
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Complaint updated successfully",
        complaint
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// Get all complaints

const getComplaints = async (
  req,
  res
) => {
  try {
    const complaints =
      await Complaint.find()
        .populate(
          "resident",
          "name email flatNumber"
        );

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createComplaint,
  updateComplaintStatus,
  getComplaints
};