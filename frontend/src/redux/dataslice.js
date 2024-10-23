import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async (token) => {
    const response = await axios.get('http://localhost:5000/api/data', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        title: '',
        description: '',
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.title = action.payload.title;
                state.description = action.payload.description;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;
