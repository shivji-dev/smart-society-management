import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getVisitors
} from "../../services/visitorService";

const VisitorHistory = () => {

  const [
    visitors,
    setVisitors
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    filter,
    setFilter
  ] = useState("all");

  const [
    selectedVisitor,
    setSelectedVisitor
  ] = useState(null);

  // Fetch

  const fetchVisitors =
    async () => {

      try {

        const data =
          await getVisitors();

        setVisitors(
          data.visitors
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchVisitors();

  }, []);

  // Filter Logic

  const filteredVisitors =
    visitors.filter(
      (visitor) => {

        const matchesSearch =

          visitor.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          visitor.phone.includes(
            search
          );

        const matchesFilter =

          filter === "all"
            ? true
            : visitor.status ===
              filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  return (

    <DashboardLayout role="resident">

      <div className="bg-white p-8 rounded-3xl shadow-lg">

        {/* Top */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">

            Visitor History

          </h2>

          <div className="flex gap-4 flex-col md:flex-row">

            {/* Search */}

            <input
              type="text"
              placeholder="Search visitor..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-xl px-5 py-3 outline-none"
            />

            {/* Filter */}

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-xl px-5 py-3 outline-none"
            >

              <option value="all">
                All
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* Table */}

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
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredVisitors.map(
                (visitor) => (

                  <tr
                    key={visitor._id}
                    onClick={() =>
                      setSelectedVisitor(
                        visitor
                      )
                    }
                    className="border-b cursor-pointer hover:bg-gray-50 transition"
                  >

                    <td className="py-4">

                      {visitor.name}

                    </td>

                    <td className="py-4">

                      {visitor.phone}

                    </td>

                    <td className="py-4">

                      {visitor.purpose}

                    </td>

                    <td className="py-4">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                        
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

                    <td className="py-4">

                      {new Date(
                        visitor.createdAt
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}

      {selectedVisitor && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative">

            {/* Close */}

            <button
              onClick={() =>
                setSelectedVisitor(
                  null
                )
              }
              className="absolute top-4 right-4 text-gray-500 text-2xl"
            >

              ×

            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">

              Visitor Details

            </h2>

            <div className="space-y-5">

              <div>

                <p className="text-gray-500">
                  Name
                </p>

                <h3 className="text-xl font-semibold">

                  {
                    selectedVisitor.name
                  }

                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Phone
                </p>

                <h3 className="text-xl font-semibold">

                  {
                    selectedVisitor.phone
                  }

                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Flat Number
                </p>

                <h3 className="text-xl font-semibold">

                  {
                    selectedVisitor.flatNumber
                  }

                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Purpose
                </p>

                <h3 className="text-xl font-semibold">

                  {
                    selectedVisitor.purpose
                  }

                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Status
                </p>

                <h3 className="text-xl font-semibold capitalize">

                  {
                    selectedVisitor.status
                  }

                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Entry Time
                </p>

                <h3 className="text-xl font-semibold">

                  {new Date(
                    selectedVisitor.createdAt
                  ).toLocaleString()}

                </h3>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );
};

export default VisitorHistory;