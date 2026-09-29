-- =========================
-- PART I
-- =========================

DROP TABLE IF EXISTS Library;
DROP TABLE IF EXISTS CustomerProfile;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Student;

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT UNIQUE,
    FOREIGN KEY (customer_id)
        REFERENCES Customer(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Customer (first_name, last_name)
VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (
    TRUE,
    (SELECT id FROM Customer
     WHERE first_name = 'John' AND last_name = 'Doe')
);

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (
    FALSE,
    (SELECT id FROM Customer
     WHERE first_name = 'Jerome' AND last_name = 'Lalu')
);

-- Logged-in customers
SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp
    ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

-- All customers
SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp
    ON c.id = cp.customer_id;

-- Customers not logged in
SELECT COUNT(*) AS not_logged_in
FROM Customer c
LEFT JOIN CustomerProfile cp
    ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE
   OR cp.isLoggedIn IS NULL;


-- =========================
-- PART II
-- =========================

CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

INSERT INTO Book (title, author)
VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age BETWEEN 0 AND 15)
);

INSERT INTO Student (name, age)
VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE Library (
    book_fk_id INT,
    student_fk_id INT,
    borrowed_date DATE,

    PRIMARY KEY (book_fk_id, student_fk_id),

    FOREIGN KEY (book_fk_id)
        REFERENCES Book(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (student_fk_id)
        REFERENCES Student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES
(
    (SELECT book_id FROM Book
     WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student
     WHERE name = 'John'),
    '2022-02-15'
),
(
    (SELECT book_id FROM Book
     WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM Student
     WHERE name = 'Bob'),
    '2021-03-03'
),
(
    (SELECT book_id FROM Book
     WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student
     WHERE name = 'Lera'),
    '2021-05-23'
),
(
    (SELECT book_id FROM Book
     WHERE title = 'Harry Potter'),
    (SELECT student_id FROM Student
     WHERE name = 'Bob'),
    '2021-08-12'
);

-- Display junction table
SELECT * FROM Library;

-- Student + book
SELECT
    Student.name AS student_name,
    Book.title AS book_title
FROM Library
JOIN Student
    ON Library.student_fk_id = Student.student_id
JOIN Book
    ON Library.book_fk_id = Book.book_id;

-- Average age for Alice In Wonderland
SELECT AVG(Student.age) AS average_age
FROM Library
JOIN Student
    ON Library.student_fk_id = Student.student_id
JOIN Book
    ON Library.book_fk_id = Book.book_id
WHERE Book.title = 'Alice In Wonderland';

-- Delete John
DELETE FROM Student
WHERE name = 'John';

-- Check CASCADE
SELECT * FROM Library;