import React,
{
  useEffect,
  useState
} from "react";

import axios from "axios";

const MyProfile = () => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchProfile();

  }, []);


  // ============================
  // FETCH PROFILE
  // ============================

  const fetchProfile =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(

          "import.meta.env.VITE_API_URL.replace("/api", "")
)0/api/resident/profile",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUser(
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

        My Profile

      </h1>


      {loading ? (

        <p>
          Loading...
        </p>

      ) : !user ? (

        <p>
          User not found
        </p>

      ) : (

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            maxWidth: "500px",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >

          <div
            style={{
              marginBottom: "15px",
            }}
          >

            <strong>
              Name:
            </strong>

            {" "}
            {user.name}

          </div>


          <div
            style={{
              marginBottom: "15px",
            }}
          >

            <strong>
              Email:
            </strong>

            {" "}
            {user.email}

          </div>


          <div
            style={{
              marginBottom: "15px",
            }}
          >

            <strong>
              Role:
            </strong>

            {" "}
            {user.role}

          </div>


          <div
            style={{
              marginBottom: "15px",
            }}
          >

            <strong>
              Flat Number:
            </strong>

            {" "}
            {user.flatNumber}

          </div>


          <div
            style={{
              marginBottom: "15px",
            }}
          >

            <strong>
              Phone:
            </strong>

            {" "}
            {user.phone}

          </div>

        </div>

      )}

    </div>
  );
};

export default MyProfile;