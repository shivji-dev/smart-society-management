import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  createServiceRequest,
  getServiceRequests
} from "../../services/serviceRequestService";

const Services = () => {

  const [
    requests,
    setRequests
  ] = useState([]);

  const [formData, setFormData] =
    useState({
      serviceType: "",
      description: ""
    });

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

  // Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // Submit

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createServiceRequest(
          formData
        );

        alert(
          "Service Request Created"
        );

        setFormData({
          serviceType: "",
          description: ""
        });

        fetchRequests();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout role="resident">

      {/* Form */}

      <div className="bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Request Service

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Select */}

          <select
            name="serviceType"
            value={
              formData.serviceType
            }
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-4"
            required
          >

            <option value="">
              Select Service
            </option>

            <option value="Plumber">
              Plumber
            </option>

            <option value="Electrician">
              Electrician
            </option>

            <option value="Cleaning">
              Cleaning
            </option>

            <option value="Internet">
              Internet
            </option>

          </select>

          {/* Description */}

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            placeholder="Describe your issue"
            rows="5"
            className="w-full border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          {/* Button */}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >

            Submit Request

          </button>

        </form>

      </div>

      {/* Requests */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          My Requests

        </h2>

        <div className="space-y-5">

          {requests.map(
            (request) => (

              <div
                key={request._id}
                className="border rounded-2xl p-5"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold">

                    {
                      request.serviceType
                    }

                  </h2>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    
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

                <p className="text-gray-600 mt-3">

                  {
                    request.description
                  }

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>

  );
};

export default Services;