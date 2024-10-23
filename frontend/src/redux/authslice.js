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
        
      
        if (response.data.token) {
            dispatch(login(response.data.token));
            return { success: true }; 
        } else {
            return { error: "Invalid credentials" }; 
        }
    } catch (error) {
       
        if (error.response) {
            
            if (error.response.status === 401) {
                return { error: "Invalid email or password." }; 
            }
            return { error: "Invalid email or password." };
        } else {
            
            return { error: "Network error. Please try again later." };
        }
    }
};

export default authSlice.reducer;
