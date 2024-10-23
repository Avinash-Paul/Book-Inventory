import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/reducer/bookReducer'; 
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth); 
    const { books = [], loading, error } = useSelector((state) => state.books); 


    useEffect(() => {
        if (token) {
            dispatch(getBooks());
        }
    }, [dispatch, token]);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <div className="button-container">
                        <Link to="/add-book">
                            <button className="sidebar-button">Add a New Book</button>
                        </Link>
                        <Link to="/book-list">
                            <button className="sidebar-button">View Book List</button>
                        </Link>
                    </div>
                </aside>
                <main className="dashboard-main">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <>
                            <h2>Your Book List</h2>
                            {books.length > 0 ? (
                                <table className="book-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book, index) => (
                                            <tr key={index}>
                                                <td>{book.title}</td>
                                                <td>{book.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No books available.</p>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
