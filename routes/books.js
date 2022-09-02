const express = require("express");

const { users } = require("../data/users.json");
const { books } = require("../data/books.json");
const { getAllBooks, getBookById, getAllIssuedBooks } = require("../controllers/books-controller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books details
 * Access: Public
 * Parameters: None
*/
router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: None
*/
router.get("/:id", getBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: None
*/
router.get("/issued/by-user", getAllIssuedBooks);

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