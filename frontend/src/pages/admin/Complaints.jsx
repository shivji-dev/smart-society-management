import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getComplaints,
  updateComplaintStatus
} from "../../services/complaintService";

const Complaints = () => {

  const [
    complaints,
    setComplaints
  ] = useState([]);

  // Fetch

  const fetchComplaints =
    async () => {

      try {

        const data =
          await getComplaints();

        setComplaints(
          data.complaints
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchComplaints();

  }, []);

  // Update Status

  const handleStatus =
    async (id, status) => {

      try {

        await updateComplaintStatus(
          id,
          status
        );

        fetchComplaints();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout role="admin">

      <div className="bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Complaints Management

        </h2>

        <div className="space-y-6">

          {complaints.map(
            (complaint) => (

              <div
                key={complaint._id}
                className="border rounded-2xl p-6"
              >

                {/* Top */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                      {complaint.title}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      Resident:
                      {" "}
                      {
                        complaint
                          ?.resident
                          ?.name
                      }

                    </p>

                    <p className="text-gray-500">

                      Flat:
                      {" "}
                      {
                        complaint
                          ?.resident
                          ?.flatNumber
                      }

                    </p>

                  </div>

                  {/* Status */}

                  <span
                    className={`px-5 py-3 rounded-full text-sm font-semibold h-fit
                    
                    ${
                      complaint.status ===
                      "resolved"

                        ? "bg-green-100 text-green-600"

                        : complaint.status ===
                          "pending"

                        ? "bg-yellow-100 text-yellow-600"

                        : "bg-blue-100 text-blue-600"
                    }
                    
                    `}
                  >

                    {complaint.status}

                  </span>

                </div>

                {/* Description */}

                <p className="text-gray-700 mt-5 leading-7">

                  {
                    complaint.description
                  }

                </p>

                {/* Buttons */}

                <div className="flex gap-4 mt-6 flex-wrap">

                  <button
                    onClick={() =>
                      handleStatus(
                        complaint._id,
                        "pending"
                      )
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >

                    Pending

                  </button>

                  <button
                    onClick={() =>
                      handleStatus(
                        complaint._id,
                        "in-progress"
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >

                    In Progress

                  </button>

                  <button
                    onClick={() =>
                      handleStatus(
                        complaint._id,
                        "resolved"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >

                    Resolved

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>

  );
};

export default Complaints;