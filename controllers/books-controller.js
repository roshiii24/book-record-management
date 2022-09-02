const IssuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models");

exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book found",
        })
    }
    
    res.status(200).json({
        success: true,
        data: books,
    })
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) return res.status(404).json({ success: false, message: "Book not found" })
    
    return res.status(200).json({
        success: true,
        data: book
    })
}

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBook = users.map((each) => new IssuedBook(each));

    if(issuedBook.length === 0) return res.status(404).json({ success: false, message: "No issued books"})

    res.status(200).json({
        success: true,
        data: issuedBook
    })
}