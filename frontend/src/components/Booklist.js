import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/reducer/bookReducer';
import './Booklist.css'; 

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div className="book-list-container">
            <h2>Your Book List</h2>
            {loading ? (
                <p className="loading">Loading books...</p>   
            ) : error ? (
                <p className="error">Error: {error}</p>
            ) : (
                <div className="book-list">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div key={book._id} className="book-card">
                                <h3>{book.title}</h3>
                                <p>{book.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-books">No books available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookList;
