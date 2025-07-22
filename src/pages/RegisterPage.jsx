import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
debugger
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profile_image') {
        formData.append(key, value[0]);
      } else if (key === 'user_type_id' || key === 'location_id') {
        formData.append(key, Number(value));
      } else {
        formData.append(key, value);
      }
    });

    formData.append('firebase_token', 'dummy_token');
    formData.append('installation_id', 'dummy_installation');

    try {
      const res = await registerUser(formData);
      dispatch(login({ token: res.data.result.response.token, user: res.data.result.response.data }));
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration error. Check console.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-teal-400 flex justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Registration Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">

          {[
            { label: "User Type ID", name: "user_type_id", type: "number" },
            { label: "Full Name", name: "name", type: "text" },
            { label: "Mobile", name: "mobile", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Company Name", name: "company_name", type: "text" },
            { label: "GST No", name: "gst_no", type: "text" },
            { label: "PAN No", name: "pan_no", type: "text" },
            { label: "Location ID", name: "location_id", type: "number" },
            { label: "Login Via (ANDROID/IOS)", name: "login_via", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                {...register(name)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('profile_image', { required: true })}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-md text-lg font-medium hover:scale-[1.03] transition-transform"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <span className="text-blue-500 cursor-pointer">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
