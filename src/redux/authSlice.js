import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
const token = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: { token, user },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
