import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(user)
  const handleLogout = () => {
    debugger
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center">
            Welcome, {user?.name}
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">Your profile details are below</p>
        </div>

        {/* Info Section */}
       {/* Info Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-sm">
  <div className="md:col-span-2 flex justify-center mb-4">
    <img
      src={user?.profile_img}
      alt="Profile"
      className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover shadow-md"
    />
  </div>
  <div><span className="font-semibold">Email:</span> {user?.email}</div>
  <div><span className="font-semibold">Mobile:</span> {user?.mobile}</div>
  <div><span className="font-semibold">Company:</span> {user?.company_name}</div>
  <div><span className="font-semibold">GST No:</span> {user?.gst_no}</div>
  <div><span className="font-semibold">PAN No:</span> {user?.pan_no}</div>
  <div><span className="font-semibold">Location ID:</span> {user?.location_id}</div>
  <div><span className="font-semibold">Country ID:</span> {user?.country_id}</div>
</div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
