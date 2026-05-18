const express = require("express");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require( "./routes/notificationRoutes");
const app = express();


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    'https://smart-society-management-plum.vercel.app'
  ],
  credentials: true
}));


app.use(express.json());


// Health Check
app.get("/", (req, res) => {
  res.send(
    "Smart Society Backend Running"
  );
});


// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use("/api/users", userRoutes);
app.use(
  "/api/services",
  serviceRoutes
);
app.use(
  "/api/visitors",
  visitorRoutes
);
app.use(
  "/api/complaints",
  complaintRoutes
);

// Global Error Handler
app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    res.status(500).json({
      message:
        err.message ||
        "Server Error"
    });
  }
);


module.exports = app;