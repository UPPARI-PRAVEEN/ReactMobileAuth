import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: { name: "Romaguera-Crona" },
    },
  ]);
  const [inputUser, setUserInput] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
  });
  const [viewUser, setViewUser] = useState(null); // for View details

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response?.status === 200) {
        setUsers(response?.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const handleDelete = (e, index, id) => {
    const filteredData = users?.filter((item, idx) => idx !== index);
    setUsers(filteredData);
  };

  const handleEdit = (e, index, id) => {
    const selectedUser = users[index];
    setUserInput(selectedUser);
    setShowForm(true);
  };

  const handleCreateUser = () => {
    setUserInput({
      name: "",
      username: "",
      email: "",
      address: { street: "", city: "" },
    });
    setShowForm(true);
  };

  const handleView = (user) => {
    setViewUser(user);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Users</h1>

      {!showForm && (
        <>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Username:</span>{" "}
                    {user.username}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {user.address.street}, {user.address.city}
                  </p>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleView(user)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => handleEdit(e, index, user?.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, index, user?.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
          <button
            onClick={handleCreateUser}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create User
          </button>
        </>
      )}

      {showForm && (
        <Form
          inputUser={inputUser}
          setUsers={setUsers}
          users={users}
          setShowForm={setShowForm}
          setUserInput={setUserInput}
        />
      )}

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              User Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {viewUser.name}
              </p>
              <p>
                <span className="font-semibold">Username:</span>{" "}
                {viewUser.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {viewUser.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {viewUser.phone}
              </p>
              <p>
                <span className="font-semibold">Website:</span>{" "}
                {viewUser.website}
              </p>
              <p>
                <span className="font-semibold">Company:</span>{" "}
                {viewUser.company?.name}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {viewUser.address.street}, {viewUser.address.suite},{" "}
                {viewUser.address.city}, {viewUser.address.zipcode}
              </p>
              <p>
                <span className="font-semibold">Geo:</span> Lat{" "}
                {viewUser.address.geo.lat}, Lng {viewUser.address.geo.lng}
              </p>
            </div>
            <button
              onClick={() => setViewUser(null)}
              className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
