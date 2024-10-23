import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/Registerpage";
import Dashboard from "./components/Dashboard";
import AddBookForm from "./components/AddBookform";
import BookList from "./components/Booklist";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/book-list" element={<BookList />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
