require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*
SERVE LOCAL IMAGES
*/
app.use("/images", express.static("images"));

/*
GET ALL BOOKS
*/
app.get("/books", (req, res) => {

    db.query(
        `
        SELECT
            books.id,
            books.title,
            authors.name AS author,
            books.price,
            books.category,
            books.image
        FROM books
        JOIN authors
        ON books.author_id = authors.id
        `,
        (err, results) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});

/*
SEARCH BOOKS
*/
app.get("/books/search/:keyword", (req, res) => {

    const keyword = `%${req.params.keyword}%`;

    db.query(
        `
        SELECT
            books.id,
            books.title,
            authors.name AS author,
            books.price,
            books.category,
            books.image
        FROM books
        JOIN authors
        ON books.author_id = authors.id
        WHERE books.title LIKE ?
        OR authors.name LIKE ?
        `,
        [keyword, keyword],
        (err, results) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});

/*
ADD BOOK
*/
app.post("/books", (req, res) => {

    const {
        title,
        author_id,
        price,
        category,
        image
    } = req.body;

    db.query(
        `
        INSERT INTO books
        (title, author_id, price, category, image)
        VALUES (?, ?, ?, ?, ?)
        `,
        [title, author_id, price, category, image],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message: "Book Added"
            });
        }
    );

});

/*
DELETE BOOK
*/
app.delete("/books/:id", (req, res) => {

    db.query(
        "DELETE FROM books WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message: "Book Deleted"
            });
        }
    );

});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});