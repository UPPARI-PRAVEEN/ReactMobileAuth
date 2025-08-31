import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ inputUser, setUsers, users, setShowForm, setUserInput }) => {
  const [formValues, setFormValue] = useState(inputUser);

  useEffect(() => {
    setFormValue(inputUser);
  }, [inputUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (formValues.id) {
        // PUT (Edit)
        response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${formValues.id}`,
          {
            id: formValues.id,
            name: formValues.name,
            username: formValues.username,
            email: formValues.email,
            address: formValues.address,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // POST (Create)
        response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          {
            name: formValues.name,
            username: formValues.username,
            email: formValues.email,
            address: formValues.address,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const data = response.data;
      console.log("API Response:", data);

      if (formValues.id) {
        // Update in state
        const updated = users.map((u) =>
          u.id === formValues.id ? { ...u, ...data } : u
        );
        setUsers(updated);
      } else {
        // Add in state
        setUsers((prev) => [...prev, { ...data, id: Date.now() }]);
      }

      // Reset form
      setUserInput({
        name: "",
        username: "",
        email: "",
        address: { street: "", city: "" },
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {formValues.id ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formValues?.name || ""}
          onChange={(e) => setFormValue({ ...formValues, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Username"
          value={formValues?.username || ""}
          onChange={(e) =>
            setFormValue({ ...formValues, username: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={formValues?.email || ""}
          onChange={(e) =>
            setFormValue({ ...formValues, email: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Street"
          value={formValues?.address?.street || ""}
          onChange={(e) =>
            setFormValue({
              ...formValues,
              address: { ...formValues.address, street: e.target.value },
            })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="City"
          value={formValues?.address?.city || ""}
          onChange={(e) =>
            setFormValue({
              ...formValues,
              address: { ...formValues.address, city: e.target.value },
            })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {formValues.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
