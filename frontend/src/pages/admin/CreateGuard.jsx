import {
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import API
from "../../utils/api";

const CreateGuard = () => {

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: "",

      password: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/users/create-guard",
          formData
        );

        alert(
          "Guard Created Successfully"
        );

        setFormData({

          name: "",

          email: "",

          phone: "",

          password: ""

        });

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      }

    };

  return (

    <DashboardLayout role="admin">

      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-3xl">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">

          Create Guard

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Guard Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Guard Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Guard Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >

            Create Guard

          </button>

        </form>

      </div>

    </DashboardLayout>

  );
};

export default CreateGuard;