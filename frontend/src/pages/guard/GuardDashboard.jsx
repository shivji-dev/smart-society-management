import { useEffect, useState }
from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  addVisitor,
  getVisitors
} from "../../services/visitorService";

import socket from "../../socket";

const GuardDashboard = () => {

  const [visitors, setVisitors] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      purpose: "",
      flatNumber: "",
    });

  // Fetch Visitors

  const fetchVisitors = async () => {

    try {

      const data =
        await getVisitors();

      setVisitors(data.visitors);

    } catch (error) {

      console.log(error);

    }
  };

  // Initial Load

  useEffect(() => {

    fetchVisitors();

  }, []);

  // Realtime

  useEffect(() => {

    socket.on(
      "newVisitor",
      () => {

        fetchVisitors();

      }
    );

    socket.on(
      "visitorStatusUpdated",
      () => {

        fetchVisitors();

      }
    );

    return () => {

      socket.off(
        "newVisitor"
      );

      socket.off(
        "visitorStatusUpdated"
      );

    };

  }, []);

  // Input Change

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

        await addVisitor(
          formData
        );

        setFormData({
          name: "",
          phone: "",
          purpose: "",
          flatNumber: "",
        });

        fetchVisitors();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message
        );
      }

    };

  return (

    <DashboardLayout role="guard">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">

          Guard Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Manage visitor entries

        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total */}

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Visitors

          </h2>

          <h1 className="text-5xl font-bold text-blue-600 mt-4">

            {visitors.length}

          </h1>

        </div>

        {/* Approved */}

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Approved

          </h2>

          <h1 className="text-5xl font-bold text-green-600 mt-4">

            {
              visitors.filter(
                (v) =>
                  v.status ===
                  "approved"
              ).length
            }

          </h1>

        </div>

        {/* Pending */}

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Pending

          </h2>

          <h1 className="text-5xl font-bold text-yellow-500 mt-4">

            {
              visitors.filter(
                (v) =>
                  v.status ===
                  "pending"
              ).length
            }

          </h1>

        </div>

      </div>

      {/* Add Visitor */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold mb-8">

          Add Visitor

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* Name */}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Visitor Name"
            className="border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          {/* Phone */}

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-300 rounded-xl px-5 py-4"
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
            className="border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          {/* Purpose */}

          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose"
            className="border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          {/* Button */}

          <div className="md:col-span-2">

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
            >

              Add Visitor

            </button>

          </div>

        </form>

      </div>

      {/* Visitor Table */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg overflow-auto">

        <h2 className="text-3xl font-bold mb-8">

          Recent Visitors

        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                Name
              </th>

              <th className="text-left py-4">
                Flat
              </th>

              <th className="text-left py-4">
                Phone
              </th>

              <th className="text-left py-4">
                Purpose
              </th>

              <th className="text-left py-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {visitors.map(
              (visitor) => (

                <tr
                  key={visitor._id}
                  className="border-b"
                >

                  <td className="py-5">
                    {visitor.name}
                  </td>

                  <td className="py-5">
                    {
                      visitor.flatNumber
                    }
                  </td>

                  <td className="py-5">
                    {visitor.phone}
                  </td>

                  <td className="py-5">
                    {
                      visitor.purpose
                    }
                  </td>

                  <td className="py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold

                      ${
                        visitor.status ===
                        "approved"

                          ? "bg-green-100 text-green-700"

                          : visitor.status ===
                            "rejected"

                          ? "bg-red-100 text-red-700"

                          : "bg-yellow-100 text-yellow-700"
                      }
                      
                      `}
                    >

                      {visitor.status}

                    </span>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );
};

export default GuardDashboard;