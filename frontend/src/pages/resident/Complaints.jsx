import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  createComplaint,
  getComplaints
} from "../../services/complaintService";

const Complaints = () => {

  const [
    complaints,
    setComplaints
  ] = useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: ""
    });

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

        await createComplaint(
          formData
        );

        alert(
          "Complaint Submitted"
        );

        setFormData({
          title: "",
          description: ""
        });

        fetchComplaints();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout role="resident">

      {/* Form */}

      <div className="bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Raise Complaint

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Complaint Title"
            className="w-full border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            placeholder="Describe issue"
            rows="5"
            className="w-full border border-gray-300 rounded-xl px-5 py-4"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >

            Submit Complaint

          </button>

        </form>

      </div>

      {/* Complaint List */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          My Complaints

        </h2>

        <div className="space-y-5">

          {complaints.map(
            (complaint) => (

              <div
                key={complaint._id}
                className="border rounded-2xl p-5"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold">

                    {complaint.title}

                  </h2>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                  
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

                <p className="text-gray-600 mt-3">

                  {
                    complaint.description
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

export default Complaints;