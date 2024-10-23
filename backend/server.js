require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

// Define a router
const router = express.Router();

const Book = require('./models/book');
const { use } = require('./routes/authroutes');

// Fetch all books for the logged-in user
app.get('/books', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const books = await Book.find({ userId: decoded.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { title, description } = req.body;
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const newBook = new Book({ title, description, userId: decoded.userId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book' });
  }
});

// Edit a book
app.put('/books/:id', async (req, res) => {
  const { title, description } = req.body;
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: decoded.userId },
      { title, description },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error editing book' });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const book = await Book.findOneAndDelete({ _id: req.params.id, userId: decoded.userId });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});


// Registration route
router.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error); // Log the error
      res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  console.log(user.password==password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = user.password==password;
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token });
});


router.get('/data', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); 
    const data = { title: 'React Task', description: 'This is the description fetched from the backend.' };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});


app.use('/', router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
