import axios from 'axios';

const BASE_URL = 'https://d32neyt9p9wyaf.cloudfront.net/api/v3';

export const api = axios.create({ baseURL: BASE_URL });

export const sendOTP = (mobile) => api.post('/otp-send', { mobile });
export const loginCheck = (mobile) => api.post('/login', { mobile });
export const registerUser = (formData) =>
  api.post('/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const fetchProfile = (user_id, token) =>
  api.get(`/post-details?user_id=${user_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });