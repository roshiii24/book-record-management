const express = require('express');
const dotenv = require('dotenv');

const usersRouters = require("./routes/users");
const booksRouters = require("./routes/books");
const DbConnection = require('./databaseConnection');

dotenv.config();

const app = express();

DbConnection();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message : "Server is up and running"
    })
})

app.use("/users", usersRouters);
app.use("/books", booksRouters);

app.get("*", (req, res) => {
    res.status(404).json({
        message : "This route does not exit",
    })
})

app.listen(port, (req, res) => {
    console.log(`Server is running at port ${port}`)
})