const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Validate if username exists
const isValid = (username) => {
    return users.some((user) => user.username === username);
};

// Authenticate if username and password match
const authenticatedUser = (username, password) => {
    return users.some((user) => user.username === username && user.password === password);
};

// Register new user
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (isValid(username)) {
        return res.status(409).json({ message: "User already exists." });
    }

    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully." });
});

// Login for registered users
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const accessToken = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
    req.session.authorization = { accessToken };
    
    return res.status(200).json({ message: "Login successful", token: accessToken });
});

// Add or Modify a review (Logged-in users only)
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    if (!review) {
        return res.status(400).json({ message: "Review is required." });
    }

    const username = req.user.username;

    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: "Review added/updated successfully." });
    } else {
        return res.status(404).json({ message: "Book not found." });
    }
});

// Delete a review (Only by the user who added it)
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;

    if (books[isbn]) {
        if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.status(200).json({ message: "Review deleted successfully." });
        } else {
            return res.status(404).json({ message: "No review by this user." });
        }
    } else {
        return res.status(404).json({ message: "Book not found." });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
