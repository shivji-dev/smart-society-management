import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Home */
import Home from "../pages/home/Home";

/* Auth */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Admin */
import AdminDashboard from "../pages/admin/AdminDashboard";

/* Guard */
import GuardDashboard from "../pages/guard/GuardDashboard";

/* Resident */
import ResidentDashboard from "../pages/resident/ResidentDashboard";
import Visitors from "../pages/resident/Visitors";
import Complaints from "../pages/resident/Complaints";
import Profile from "../pages/resident/Profile";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* ================= GUARD ================= */}

        <Route
          path="/guard/dashboard"
          element={<GuardDashboard />}
        />

        {/* ================= RESIDENT ================= */}

        <Route
          path="/resident/dashboard"
          element={<ResidentDashboard />}
        />

        <Route
          path="/resident/visitors"
          element={<Visitors />}
        />

        <Route
          path="/resident/complaints"
          element={<Complaints />}
        />

        <Route
          path="/resident/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>

  );
};

export default AppRoutes;