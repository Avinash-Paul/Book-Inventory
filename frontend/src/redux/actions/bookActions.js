import axios from 'axios';

export const getBooks = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/books', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch({ type: 'GET_BOOKS_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_BOOKS_FAIL', payload: error.message });
    }
};

export const addBook = (book) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/books', book, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch({ type: 'ADD_BOOK_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'ADD_BOOK_FAIL', payload: error.message });
    }
};
