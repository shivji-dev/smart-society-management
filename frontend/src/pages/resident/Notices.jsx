import React,
{
  useEffect,
  useState
} from "react";

import axios from "axios";

const Notice = () => {

  const [notices, setNotices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchNotices();

  }, []);


  // ============================
  // FETCH NOTICES
  // ============================

  const fetchNotices =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(

          "import.meta.env.VITE_API_URL.replace("/api", "")
)0/api/notices",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setNotices(
        response.data
      );

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

        Society Notices

      </h1>


      {loading ? (

        <p>
          Loading...
        </p>

      ) : notices.length === 0 ? (

        <p>
          No Notices Found
        </p>

      ) : (

        <div>

          {notices.map((notice) => (

            <div
              key={notice._id}

              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow:
                  "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >

              <h2>

                {notice.title}

              </h2>

              <p
                style={{
                  marginTop: "10px",
                }}
              >

                {notice.description}

              </p>

              <small
                style={{
                  color: "gray",
                }}
              >

                {
                  new Date(
                    notice.createdAt
                  ).toLocaleDateString()
                }

              </small>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Notice;