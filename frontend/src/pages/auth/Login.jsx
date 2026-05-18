import { useState }
from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../../utils/api";

const Login = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // Submit

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await API.post(
            "/auth/login",
            formData
          );

        // Save

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        // Redirect

        if (
          data.user.role ===
          "admin"
        ) {

          navigate(
            "/admin/dashboard"
          );

        } else if (
          data.user.role ===
          "guard"
        ) {

          navigate(
            "/guard/dashboard"
          );

        } else {

          navigate(
            "/resident/dashboard"
          );
        }

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden grid lg:grid-cols-2 w-full max-w-5xl">

        {/* Left */}

        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">

          <h1 className="text-4xl font-bold">

            Welcome Back

          </h1>

          <p className="mt-5 text-blue-100 leading-7">

            Login to manage visitors,
            complaints and society services.

          </p>

          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
            alt="building"
            className="rounded-2xl mt-8 h-[250px] object-cover"
          />

        </div>

        {/* Right */}

        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800">

            Login

          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Password */}

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
            >

              Login

            </button>

          </form>

          <p className="mt-6 text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 font-semibold"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Login;