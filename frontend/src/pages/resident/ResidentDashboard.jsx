import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getVisitors,
  updateVisitorStatus
} from "../../services/visitorService";

import socket from "../../socket";

const ResidentDashboard = () => {

  const [visitors, setVisitors] =
    useState([]);

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

  // First Load

  useEffect(() => {

    fetchVisitors();

  }, []);

  // Realtime Socket Updates

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

  // Approve / Reject

  const handleStatus = async (
    id,
    status
  ) => {

    try {

      await updateVisitorStatus(
        id,
        status
      );

      fetchVisitors();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <DashboardLayout role="resident">

      {/* Page Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">

          Resident Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Manage your visitors in realtime

        </p>

      </div>

      {/* Top Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total */}

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Visitors

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-blue-600">

            {visitors.length}

          </h1>

        </div>

        {/* Approved */}

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Approved

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-green-600">

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

          <h1 className="text-5xl font-bold mt-4 text-yellow-500">

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

      {/* Visitors Table */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">

            My Visitors

          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            Live Updates

          </span>

        </div>

        {/* Empty */}

        {visitors.length === 0 ? (

          <div className="text-center py-16">

            <h2 className="text-2xl font-bold text-gray-700">

              No Visitors Yet

            </h2>

            <p className="text-gray-500 mt-3">

              Visitor entries will appear here

            </p>

          </div>

        ) : (

          <div className="overflow-auto">

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

                {visitors.map(
                  (visitor) => (

                    <tr
                      key={visitor._id}
                      className="border-b"
                    >

                      {/* Name */}

                      <td className="py-5 font-medium">

                        {visitor.name}

                      </td>

                      {/* Phone */}

                      <td className="py-5">

                        {visitor.phone}

                      </td>

                      {/* Purpose */}

                      <td className="py-5">

                        {visitor.purpose}

                      </td>

                      {/* Status */}

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

                      {/* Actions */}

                      <td className="py-5">

                        {visitor.status ===
                        "pending" ? (

                          <div className="flex gap-3">

                            {/* Approve */}

                            <button
                              onClick={() =>
                                handleStatus(
                                  visitor._id,
                                  "approved"
                                )
                              }
                              className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl"
                            >

                              Approve

                            </button>

                            {/* Reject */}

                            <button
                              onClick={() =>
                                handleStatus(
                                  visitor._id,
                                  "rejected"
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-xl"
                            >

                              Reject

                            </button>

                          </div>

                        ) : (

                          <span className="text-gray-400 font-medium">

                            Action Completed

                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>

  );
};

export default ResidentDashboard;