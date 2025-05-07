const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// ✅ Task 10: Get the book list using async/await and axios
public_users.get('/', async function (req, res) {
  try {
    // Simulate async operation using Promise
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };

    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book list", error: error.message });
  }
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  // Simulate external fetch using a local promise
  const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject("Book not found");
      }
    });
  };

  getBookByISBN(isbn)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author.toLowerCase();

  const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
      const matchingBooks = [];

      for (let key in books) {
        if (books[key].author.toLowerCase() === author) {
          matchingBooks.push(books[key]);
        }
      }

      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject("No books found for this author");
      }
    });
  };

  try {
    const result = await getBooksByAuthor(author);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();

  const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
      const matchingBooks = [];

      for (let key in books) {
        if (books[key].title.toLowerCase() === title) {
          matchingBooks.push(books[key]);
        }
      }

      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject("No books found with this title");
      }
    });
  };

  getBooksByTitle(title)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(404).json({ message: error });
    });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
      return res.status(200).json(book.reviews);
  } else {
      return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
