import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/reducer/bookReducer';
import { useNavigate } from 'react-router-dom'; 
import './AddBookform.css'; 

const AddBookForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, description };
        
        try {
            await dispatch(addBook(newBook)).unwrap();
            alert('Book added successfully!'); 
            navigate('/dashboard');
        } catch (error) {
            alert('Failed to add book: ' + error.message); 
        }
    };

    return (
        <div className="add-book-container">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="submit-button">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm;
