import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendOTP, loginCheck } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [serverOTP, setServerOTP] = useState('');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSendOTP = async ({ mobile }) => {
    const res = await sendOTP(mobile);
    setMobile(mobile);
    const decodedOtp = atob(res?.data?.result?.response?.otp);
    setServerOTP(decodedOtp);
    setStep(2);
  };

 

  const handleVerifyOTP = async ({ otp }) => {
    debugger
    if (otp === serverOTP) {
      const res = await loginCheck(mobile);
      if (res.data.result.response) {
        dispatch(login({ token: res.data.result.response.token, user: res.data.result.response.data }));
        navigate('/home');
      } else {
        navigate('/register');
      }
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(step === 1 ? handleSendOTP : handleVerifyOTP)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {step === 1 ? 'Login via Mobile' : 'Enter OTP'}
        </h2>

        {step === 1 ? (
          <input
            placeholder="Mobile"
            type="text"
            {...register('mobile', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <input
            placeholder="OTP"
            type="text"
            {...register('otp', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            step === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {step === 1 ? 'Send OTP' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
