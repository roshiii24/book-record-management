const express = require('express')

const app = express();

const port = 8081;

app.get("/", (req, res) => {
    res.status(200).json({
        message : "Server is up and running"
    })
})

app.get("*", (req, res) => {
    res.status(404).json({
        message : "This route does not exit"
    })
})

app.listen(port, (req, res) => {
    console.log(`Server is running at port ${port}`)
})