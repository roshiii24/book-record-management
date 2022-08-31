const express = require("express");

const { users } = require("../data/users.json");
const { books } = require("../data/books.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books details
 * Access: Public
 * Parameters: None
*/
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: None
*/
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const book = books.find((book) => book.id === id);

    if (!book) return res.status(404).json({ success: false, message: "Book not found" })
    
    return res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: None
*/
router.get("/issued/by-user", (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook) return each
    })

    const issuedBook = [];

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        
        book.issuedName = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBook.push(book);
    });

    if(issuedBook.length === 0) return res.status(404).json({ success: false, message: "No issued books"})

    res.status(200).json({
        success: true,
        data: issuedBook
    })
})

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parameters: None
 * Data: author,name,genre,price,publisher,id
*/
router.post("/", (req, res) => {
    const { data } = req.body;

    if (!data) return res.status(404).json({ success: false, message: "No data provided" })

    const book = books.find((each) => each.id === data.id);

    if(book) return res.status(404).json({success: false, message: "Book already exist with this id, use unique id"})
    
    const allBooks = [...books, data];

    res.status(201).json({
        success: true,
        data: allBooks
    })
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book
 * Access: Public
 * Parameters: id
 * Data: author,name,genre,price,publisher,id
*/
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);

    if (!book) return res.status(404).json({
        success
            : false, message: "Book not found with this particular id"
    })

    const updateData = books.map((each) => {
        if (each.id === id) {
            return {...each,...data}
        }
        return each;
    })

    res.status(200).json({
        success: true,
        data: updateData
    })
})

module.exports = router;