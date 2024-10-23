# Book Management App

This is a MERN (MongoDB, Express, React, Node.js) stack application where users can:
- Register and log in.
- List books.
- Add, edit, and delete books.
- Manage their own collection of books.

## Pre-requisites

Ensure you have the following installed:
- **Node.js v20.x** (or higher): [Download Node.js](https://nodejs.org/)
- **npm** (Node package manager, comes with Node.js).
- **MongoDB Atlas** account: Create an account [here](https://www.mongodb.com/cloud/atlas).

## Backend Setup

1. Clone the repository and navigate to the backend folder:
    git clone git@github.com:Avinash-Paul/Book-Inventory.git
    cd backend
  

2. Install the required packages:
    npm install
    

3. Set up MongoDB Atlas:
    - Create a cluster in MongoDB Atlas.
    - Get your **MongoDB connection string** and add it to the backend \`.env\` file like this:
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key


4. Start the backend server:
    node server.js
    The backend will be running on **http://localhost:5000**.

## Frontend Setup

1. Navigate to the frontend folder:
    cd ../frontend


2. Install the required packages:

    npm install


3. Start the frontend app:
    
    npm start

    The frontend will be running on **http://localhost:3000**.

## MongoDB Atlas Configuration

- **MongoDB Atlas** is used for the database.
- Connect to MongoDB Atlas by replacing the \`MONGO_URI\` in the \`.env\` file with your own connection string from MongoDB Atlas.

## Features of the App

- **Login/Registration:** Users can register and log in.
- **Book Management:**
  - Add new books.
  - View a list of books.
  - Edit existing books.
  - Delete books.

### Ports and URLs
- Backend: **http://localhost:5000**
- Frontend: **http://localhost:3000**

