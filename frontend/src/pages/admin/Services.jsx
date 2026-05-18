import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getServiceRequests,
  updateServiceStatus
} from "../../services/serviceRequestService";

const Services = () => {

  const [
    requests,
    setRequests
  ] = useState([]);

  // Fetch

  const fetchRequests =
    async () => {

      try {

        const data =
          await getServiceRequests();

        setRequests(
          data.requests
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRequests();

  }, []);

  // Status Update

  const handleStatus =
    async (id, status) => {

      try {

        await updateServiceStatus(
          id,
          status
        );

        fetchRequests();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout role="admin">

      <div className="bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Service Requests

        </h2>

        <div className="space-y-6">

          {requests.map(
            (request) => (

              <div
                key={request._id}
                className="border rounded-2xl p-6"
              >

                {/* Top */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                      {
                        request.serviceType
                      }

                    </h2>

                    <p className="text-gray-500 mt-2">

                      Resident:
                      {" "}
                      {
                        request
                          ?.resident
                          ?.name
                      }

                    </p>

                    <p className="text-gray-500">

                      Flat:
                      {" "}
                      {
                        request
                          ?.resident
                          ?.flatNumber
                      }

                    </p>

                  </div>

                  {/* Status */}

                  <span
                    className={`px-5 py-3 rounded-full text-sm font-semibold h-fit
                    
                    ${
                      request.status ===
                      "completed"

                        ? "bg-green-100 text-green-600"

                        : request.status ===
                          "in-progress"

                        ? "bg-blue-100 text-blue-600"

                        : "bg-yellow-100 text-yellow-600"
                    }
                    
                    `}
                  >

                    {request.status}

                  </span>

                </div>

                {/* Description */}

                <p className="text-gray-700 mt-5 leading-7">

                  {
                    request.description
                  }

                </p>

                {/* Buttons */}

                <div className="flex gap-4 mt-6 flex-wrap">

                  <button
                    onClick={() =>
                      handleStatus(
                        request._id,
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
                        request._id,
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
                        request._id,
                        "completed"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >

                    Completed

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

export default Services;