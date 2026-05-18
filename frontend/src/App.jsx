import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


// Home

import Home
from "./pages/home/Home";


// Auth

import Login
from "./pages/auth/Login";

import Register
from "./pages/auth/Register";


// Resident Pages

import ResidentDashboard
from "./pages/resident/ResidentDashboard";

import Complaints
from "./pages/resident/Complaints";

import Services
from "./pages/resident/Services";

import VisitorHistory
from "./pages/resident/VisitorHistory";


// Guard Pages

import GuardDashboard
from "./pages/guard/GuardDashboard";


// Admin Pages

import AdminDashboard
from "./pages/admin/AdminDashboard";

import AdminComplaints
from "./pages/admin/Complaints";

import AdminServices
from "./pages/admin/Services";

import CreateGuard
from "./pages/admin/CreateGuard";


// Protected Route

import ProtectedRoute
from "./components/common/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= */}
        {/* HOME */}
        {/* ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= */}
        {/* AUTH */}
        {/* ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= */}
        {/* RESIDENT */}
        {/* ================= */}

        <Route
          path="/resident/dashboard"
          element={
            <ProtectedRoute role="resident">
              <ResidentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resident/complaints"
          element={
            <ProtectedRoute role="resident">
              <Complaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resident/services"
          element={
            <ProtectedRoute role="resident">
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resident/visitors"
          element={
            <ProtectedRoute role="resident">
              <VisitorHistory />
            </ProtectedRoute>
          }
        />

        {/* ================= */}
        {/* GUARD */}
        {/* ================= */}

        <Route
          path="/guard/dashboard"
          element={
            <ProtectedRoute role="guard">
              <GuardDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= */}
        {/* ADMIN */}
        {/* ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute role="admin">
              <AdminComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute role="admin">
              <AdminServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-guard"
          element={
            <ProtectedRoute role="admin">
              <CreateGuard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/visitors"
          element={
            <ProtectedRoute role="admin">
              <VisitorHistory />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;