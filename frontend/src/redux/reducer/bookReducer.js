import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getBooks = createAsyncThunk('books/getBooks', async (_, { getState }) => {
    const token = getState().auth.token; 
    const response = await axios.get('http://localhost:5000/books', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});


export const getBookById = createAsyncThunk('books/getBookById', async (id, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(`http://localhost:5000/books/${id}`, {
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


export const editBook = createAsyncThunk(
    'books/editBook',
    async ({ id, updatedBook }, { getState, rejectWithValue }) => {
      try {
        const token = getState().auth.token; 
        const response = await axios.put(`http://localhost:5000/books/${id}`, updatedBook, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  );
  


export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.delete(`http://localhost:5000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return id; 
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        book: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getBookById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.loading = false;
                state.book = action.payload;
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            .addCase(editBook.fulfilled, (state, action) => {
                state.book = action.payload;
                state.books = state.books.map((book) =>
                    book._id === action.payload._id ? action.payload : book
                );
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((book) => book._id !== action.payload);
            });
    },
});

export default booksSlice.reducer;
