import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getBooks = createAsyncThunk('books/getBooks', async (_, { getState }) => {
    const token = getState().auth.token; 
    const response = await axios.get('http://localhost:5000/books', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});


export const addBook = createAsyncThunk('books/addBook', async (book, { getState }) => {
    const token = getState().auth.token; 
    const response = await axios.post('http://localhost:5000/books', book, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});


const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.books = action.payload;
        });
        builder.addCase(getBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

       
        builder.addCase(addBook.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.loading = false;
            state.books.push(action.payload);
        });
        builder.addCase(addBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default booksSlice.reducer;
