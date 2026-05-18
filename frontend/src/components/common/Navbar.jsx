import { Link, useNavigate }
from "react-router-dom";

import NotificationBell
from "./NotificationBell";

const Navbar = () => {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Logout

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  return (

    <nav className="bg-white shadow-md px-8 py-5 flex items-center justify-between">

      {/* Logo */}

      <Link
        to="/"
        className="text-3xl font-bold text-blue-600"
      >

        Smart Society

      </Link>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* User Name */}

        {user && (

          <div className="hidden md:block text-right">

            <h2 className="font-bold text-gray-800">

              {user.name}

            </h2>

            <p className="text-sm text-gray-500 capitalize">

              {user.role}

            </p>

          </div>

        )}

        {/* Notification */}

        <NotificationBell />

        {/* Logout */}

        {user && (

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl font-semibold"
          >

            Logout

          </button>

        )}

      </div>

    </nav>

  );
};

export default Navbar;