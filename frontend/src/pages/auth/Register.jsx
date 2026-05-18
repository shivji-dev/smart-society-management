import { useState }
from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../../utils/api";

const Register = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      flatNumber: "",
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
            "/auth/register",
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

        alert(
          "Registration Successful"
        );

        navigate(
          "/resident/dashboard"
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-10">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden grid lg:grid-cols-2 w-full max-w-6xl">

        {/* Left */}

        <div className="bg-blue-600 text-white p-14 flex flex-col justify-center">

          <h1 className="text-5xl font-bold leading-tight">

            Join Smart Society

          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">

            Register yourself to access
            visitors, complaints,
            notifications and more.

          </p>

          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
            alt="building"
            className="rounded-2xl mt-10 shadow-2xl"
          />

        </div>

        {/* Right */}

        <div className="p-14">

          <h2 className="text-4xl font-bold text-gray-800">

            Resident Register

          </h2>

          <p className="text-gray-500 mt-2">

            Create your account

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* Name */}

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Email */}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Phone */}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Flat */}

            <input
              type="text"
              name="flatNumber"
              value={
                formData.flatNumber
              }
              onChange={handleChange}
              placeholder="Flat Number"
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
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4"
              required
            />

            {/* Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
            >

              Register

            </button>

          </form>

          <p className="mt-8 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Register;