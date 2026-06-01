const express = require("express"); 
const cors = require("cors"); 
const db = require("./db"); 
 
const app = express(); 
 
app.use(cors()); 
app.use(express.json()); 
 
/* 
GET ALL BOOKS 
*/ 
app.get("/books", (req, res) => { 
 
    db.query( 
        "SELECT * FROM books", 
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
        "SELECT * FROM books WHERE tle LIKE ? OR author LIKE ?", 
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
        tle, 
        author, 
        price, 
        category, 
        image 
    } = req.body; 
 
    db.query( 
        `INSERT INTO books 
        ( tle, author, price, category, image) 
        VALUES (?, ?, ?, ?, ?)`, 
        [ tle, author, price, category, image], 
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
 
app.listen(3000, () => { 
    console.log("Server running on port 3000"); 
});