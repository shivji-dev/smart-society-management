const User = require("../models/User");


// Admin creates Guard

const createGuard = async (
  req,
  res
) => {
  try {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    const exists =
      await User.findOne({
        $or: [
          { email },
          { phone }
        ]
      });

    if (exists) {
      return res
        .status(400)
        .json({
          message:
            "User already exists"
        });
    }

    const guard =
      await User.create({
        name,
        email,
        phone,
        password,
        flatNumber: "SECURITY",
        role: "guard"
      });

    res.status(201).json({
      success: true,
      message:
        "Guard created successfully",
      guard
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};


// Get all users

const getAllUsers =
async (
  req,
  res
) => {
  try {

    const users =
      await User.find()
      .select("-password");

    res.status(200).json({
      success: true,
      count:
        users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};


// Get residents only

const getResidents =
async (
  req,
  res
) => {
  try {

    const residents =
      await User.find({
        role:
          "resident"
      }).select(
        "-password"
      );

    res.status(200).json({
      success: true,
      residents
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};


// Get guards only

const getGuards =
async (
  req,
  res
) => {
  try {

    const guards =
      await User.find({
        role:
          "guard"
      }).select(
        "-password"
      );

    res.status(200).json({
      success: true,
      guards
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};


module.exports = {
  createGuard,
  getAllUsers,
  getResidents,
  getGuards
};