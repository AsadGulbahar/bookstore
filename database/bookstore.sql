#CREATE DATABASE bookstore; 
USE bookstore;

CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    price DECIMAL(10,2),
    category VARCHAR(100),
    image VARCHAR(255),

    FOREIGN KEY (author_id)
	REFERENCES authors(id)
);

INSERT INTO authors (name)
VALUES
('John Smith'),
('David Brown'),
('Sarah Wilson');

INSERT INTO books
(title, author_id, price, category, image)
VALUES
(
'Node.js Guide',
1,
29.99,
'Programming',
'nodejs-guide.jpg'
),
(
'JavaScript Mastery',
2,
34.99,
'Programming',
'javascript-mastery.jpg'
),
(
'CSS Design',
3,
19.99,
'Web Design',
'css-design.jpg'
);

INSERT INTO authors (name)
VALUES
('John Steinbeck');

INSERT INTO books
(title, author_id, price, category, image)
VALUES(
'Node.js Guide',
4,
20.99,
'Literature',
'ofmiceandmen.jpg'
);

UPDATE books
SET title = 'Of Mice and Men'
WHERE id = 4;
SELECT * FROM books;
