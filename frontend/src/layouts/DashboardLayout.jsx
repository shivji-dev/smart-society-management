// src/layouts/DashboardLayout.jsx

import {
  Link,
  useNavigate
} from "react-router-dom";

const DashboardLayout = ({
  children,
  role
}) => {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* ================= */}
      {/* SIDEBAR */}
      {/* ================= */}

      <div className="w-[260px] bg-white shadow-xl p-6 hidden md:block">

        {/* Logo */}

        <h1 className="text-3xl font-bold text-blue-600 mb-10">

          Smart Society

        </h1>

        {/* Menu */}

        <div className="space-y-5">

          {/* ================= */}
          {/* ADMIN */}
          {/* ================= */}

          {role === "admin" && (

            <>

              <Link
                to="/admin/dashboard"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Dashboard

              </Link>

              <Link
                to="/admin/complaints"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Complaints

              </Link>

              <Link
                to="/admin/services"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Services

              </Link>

              <Link
                to="/admin/visitors"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Visitors

              </Link>

              <Link
                to="/admin/create-guard"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Create Guard

              </Link>

            </>

          )}

          {/* ================= */}
          {/* GUARD */}
          {/* ================= */}

          {role === "guard" && (

            <>

              <Link
                to="/guard/dashboard"
                className="block text-gray-700 hover:text-green-600 font-medium"
              >

                Dashboard

              </Link>

            </>

          )}

          {/* ================= */}
          {/* RESIDENT */}
          {/* ================= */}

          {role === "resident" && (

            <>

              <Link
                to="/resident/dashboard"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Dashboard

              </Link>

              <Link
                to="/resident/complaints"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Complaints

              </Link>

              <Link
                to="/resident/services"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Services

              </Link>

              <Link
                to="/resident/visitors"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >

                Visitors

              </Link>

            </>

          )}

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="mt-12 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl w-full font-semibold"
        >

          Logout

        </button>

      </div>

      {/* ================= */}
      {/* MAIN CONTENT */}
      {/* ================= */}

      <div className="flex-1 p-8">

        {children}

      </div>

    </div>

  );
};

export default DashboardLayout;