const User = require("../models/User");

const generateToken =
require("../utils/generateToken");


// Resident Register

const registerResident =
async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password,
      flatNumber
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

    const user =
    await User.create({
      name,
      email,
      phone,
      password,
      flatNumber,
      role: "resident"
    });

    res.status(201).json({
      success: true,

      token:
      generateToken(
        user._id,
        user.role
      ),

      user
    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};


// Login User

const loginUser =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({
      email
    });

    if (!user) {
      return res
      .status(401)
      .json({
        message:
        "Invalid email or password"
      });
    }

    const isMatch =
    await user.matchPassword(
      password
    );

    if (!isMatch) {
      return res
      .status(401)
      .json({
        message:
        "Invalid email or password"
      });
    }

    res.status(200).json({

      success: true,

      token:
      generateToken(
        user._id,
        user.role
      ),

      user

    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};


// Seed Admin

const seedAdmin =
async (req, res) => {

  try {

    const exists =
    await User.findOne({
      email:
      "admin@gmail.com"
    });

    if (exists) {

      return res
      .status(400)
      .json({
        message:
        "Admin already exists"
      });

    }

    const admin =
    await User.create({

      name: "Admin",

      email:
      "admin@gmail.com",

      phone:
      "9999999999",

      password:
      "admin123",

      flatNumber:
      "ADMIN",

      role: "admin"

    });

    res.status(201).json({

      success: true,

      message:
      "Admin created successfully",

      admin

    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};


module.exports = {
  registerResident,
  loginUser,
  seedAdmin
};