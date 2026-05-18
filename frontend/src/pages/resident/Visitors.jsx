import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getVisitors,
  updateVisitorStatus,
} from "../../services/visitorService";

import { socket } from "../../main";

const Visitors = () => {

  const [visitors, setVisitors] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

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

  // Realtime Socket

  useEffect(() => {

    fetchVisitors();

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

  // Approve Reject

  const handleStatus = async (
    id,
    status
  ) => {

    try {

      setLoading(true);

      await updateVisitorStatus(
        id,
        status
      );

      fetchVisitors();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="resident">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Visitors
          </h1>

          <p className="text-gray-500 mt-2">
            Approve or reject visitor entries
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Total */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-gray-500 text-lg">
            Total Visitors
          </h2>

          <h1 className="text-5xl font-bold text-blue-600 mt-4">

            {visitors.length}

          </h1>

        </div>

        {/* Approved */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

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

        <div className="bg-white rounded-3xl shadow-lg p-8">

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

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">

        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Recent Visitors
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                Name
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

              <th className="text-left py-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {visitors.map((visitor) => (

              <tr
                key={visitor._id}
                className="border-b"
              >

                <td className="py-5">
                  {visitor.name}
                </td>

                <td className="py-5">
                  {visitor.phone}
                </td>

                <td className="py-5">
                  {visitor.purpose}
                </td>

                {/* Status */}

                <td className="py-5">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium
                  
                    ${
                      visitor.status ===
                      "approved"
                        ? "bg-green-100 text-green-600"

                        : visitor.status ===
                          "rejected"

                        ? "bg-red-100 text-red-600"

                        : "bg-yellow-100 text-yellow-600"
                    }
                    
                    `}
                  >

                    {visitor.status}

                  </span>

                </td>

                {/* Actions */}

                <td className="py-5">

                  {visitor.status ===
                  "pending" ? (

                    <div className="flex gap-3">

                      <button
                        disabled={loading}
                        onClick={() =>
                          handleStatus(
                            visitor._id,
                            "approved"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
                      >

                        Approve

                      </button>

                      <button
                        disabled={loading}
                        onClick={() =>
                          handleStatus(
                            visitor._id,
                            "rejected"
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
                      >

                        Reject

                      </button>

                    </div>

                  ) : (

                    <span className="text-gray-400 text-sm">

                      Action Completed

                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );
};

export default Visitors;