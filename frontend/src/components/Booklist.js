import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, deleteBook, editBook } from "../redux/reducer/bookReducer"; 
import { Link } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  

  const [editingBookId, setEditingBookId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setEditedTitle(book.title);
    setEditedDescription(book.description);
  };

  const handleSave = async (id) => {
    const updatedBook = { title: editedTitle, description: editedDescription };
    await dispatch(editBook({ id, updatedBook }));
    setEditingBookId(null); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (books.length === 0) {
    return <p>No books available.</p>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                {editingBookId === book._id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {editingBookId === book._id ? (
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  book.description
                )}
              </td>
              <td>
                {editingBookId === book._id ? (
                  <button onClick={() => handleSave(book._id)} className="save-btn">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(book)} className="edit-btn">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(book._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
