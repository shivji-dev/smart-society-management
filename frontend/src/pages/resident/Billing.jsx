import React,
{
  useEffect,
  useState
} from "react";

import {
  getResidentBills,
} from "../../services/residentBillingService";

const Billing = () => {

  const [bills, setBills] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchBills();

  }, []);


  // ============================
  // FETCH BILLS
  // ============================

  const fetchBills =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const data =
        await getResidentBills(
          token
        );

      setBills(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1
        style={{
          marginBottom: "20px",
        }}
      >

        Maintenance Bills

      </h1>


      {loading ? (

        <p>
          Loading...
        </p>

      ) : bills.length === 0 ? (

        <p>
          No Bills Found
        </p>

      ) : (

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            background: "white",
          }}
        >

          <thead
            style={{
              background:
                "#111827",
              color: "white",
            }}
          >

            <tr>

              <th>
                Month
              </th>

              <th>
                Amount
              </th>

              <th>
                Status
              </th>

              <th>
                Due Date
              </th>

            </tr>

          </thead>

          <tbody>

            {bills.map((bill) => (

              <tr key={bill._id}>

                <td>
                  {bill.month}
                </td>

                <td>
                  ₹ {bill.amount}
                </td>

                <td>

                  {bill.status}

                </td>

                <td>

                  {
                    new Date(
                      bill.dueDate
                    ).toLocaleDateString()
                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default Billing;