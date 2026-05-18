import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import API
from "../../utils/api";

const AdminDashboard = () => {

  const [
    users,
    setUsers
  ] = useState([]);

  const [
    visitors,
    setVisitors
  ] = useState([]);

  // Fetch Data

  const fetchData =
    async () => {

      try {

        // Users

        const usersRes =
          await API.get(
            "/users/all"
          );

        setUsers(
          usersRes.data.users
        );

        // Visitors

        const visitorsRes =
          await API.get(
            "/visitors/all"
          );

        setVisitors(
          visitorsRes.data.visitors
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchData();

  }, []);

  // Counts

  const residents =
    users.filter(
      (u) =>
        u.role ===
        "resident"
    );

  const guards =
    users.filter(
      (u) =>
        u.role ===
        "guard"
    );

  const approved =
    visitors.filter(
      (v) =>
        v.status ===
        "approved"
    );

  const pending =
    visitors.filter(
      (v) =>
        v.status ===
        "pending"
    );

  const rejected =
    visitors.filter(
      (v) =>
        v.status ===
        "rejected"
    );

  return (

    <DashboardLayout role="admin">

      {/* Top Stats */}

      <div className="grid md:grid-cols-3 gap-8">

        {/* Residents */}

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Residents

          </h2>

          <h1 className="text-5xl font-bold text-blue-600 mt-4">

            {residents.length}

          </h1>

        </div>

        {/* Guards */}

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Guards

          </h2>

          <h1 className="text-5xl font-bold text-green-600 mt-4">

            {guards.length}

          </h1>

        </div>

        {/* Visitors */}

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Visitors

          </h2>

          <h1 className="text-5xl font-bold text-purple-600 mt-4">

            {visitors.length}

          </h1>

        </div>

      </div>

      {/* Visitor Status */}

      <div className="grid md:grid-cols-3 gap-8 mt-10">

        {/* Approved */}

        <div className="bg-green-500 text-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-xl">

            Approved

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {approved.length}

          </h1>

        </div>

        {/* Pending */}

        <div className="bg-yellow-500 text-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-xl">

            Pending

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {pending.length}

          </h1>

        </div>

        {/* Rejected */}

        <div className="bg-red-500 text-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-xl">

            Rejected

          </h2>

          <h1 className="text-5xl font-bold mt-4">

            {rejected.length}

          </h1>

        </div>

      </div>

      {/* Recent Visitors */}

      <div className="bg-white mt-10 p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Recent Visitors

        </h2>

        <div className="overflow-auto">

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

                    <td className="py-4">

                      {visitor.name}

                    </td>

                    <td className="py-4">

                      {visitor.flatNumber}

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

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default AdminDashboard;