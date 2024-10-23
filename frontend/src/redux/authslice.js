import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        dispatch(login(response.data.token));
    } catch (error) {
        console.error('Login error', error);
    }
};

export default authSlice.reducer;