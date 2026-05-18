import React, { useEffect, useState } from "react";
import axios from "axios";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: "",
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/visitors"
      );

      setVisitors(res.data.visitors || res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/visitors",
        formData
      );

      alert("Visitor Added");

      setFormData({
        name: "",
        phone: "",
        purpose: "",
      });

      fetchVisitors();

    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Visitors Entry</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Visitor Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Visitor
        </button>
      </form>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.name}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visitors;