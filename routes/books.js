var express = require("express");
var router = express.Router();
const bookObject = require("../booksdata");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("index", { books: bookObject.books });
});

router.post("/delete/:Id", function (req, res, next) {
  let newBookList = bookObject.books.filter(
    (book) => book.isbn !== req.params.Id
  );
  bookObject.books = newBookList;
  res.redirect("/books");
});

router.get("/new", function (req, res, next) {
  res.render("new");
});

router.post("/new", function (req, res, next) {
  bookObject.books.push(req.body);
  res.redirect("/books");
});

router.get("/edit/:Id", function (req, res, next) {
  let Id = req.params.Id;
  let filteredBook = bookObject.books.filter((book) => book.isbn == Id);
  console.log(filteredBook);
  res.render("edit", { book: filteredBook[0] });
});

router.post("/edit/:Id", function (req, res, next) {
  let Id = req.params.Id;
  let newBookList = bookObject.books.map((book) => {
    if (book.isbn == Id) {
      book = req.body;
    }
    return book;
  });
  bookObject.books = newBookList;
  res.redirect("/books");
});

module.exports = router;
