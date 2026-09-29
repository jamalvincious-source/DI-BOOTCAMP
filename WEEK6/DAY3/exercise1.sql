-- 1. All languages
SELECT *
FROM language;


-- 2. Films with their languages
SELECT 
    film.title,
    film.description,
    language.name AS language_name
FROM film
INNER JOIN language
    ON film.language_id = language.language_id;


-- 3. All languages, including languages without films
SELECT 
    film.title,
    film.description,
    language.name AS language_name
FROM language
LEFT JOIN film
    ON language.language_id = film.language_id;


-- 4. Create new_film
CREATE TABLE new_film (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


-- Add films
INSERT INTO new_film (name)
VALUES
('The Great Adventure'),
('Lost in Nairobi'),
('The Last Journey'),
('Code Master');


-- 5. Create customer_review
CREATE TABLE customer_review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (film_id)
        REFERENCES new_film(id)
        ON DELETE CASCADE,

    FOREIGN KEY (language_id)
        REFERENCES language(language_id)
);


-- 6. Add two reviews
INSERT INTO customer_review
    (film_id, language_id, title, score, review_text)
VALUES
    (1, 1, 'Amazing Movie', 9, 'This was a very entertaining movie.'),
    (2, 2, 'Good Story', 8, 'The story was interesting and enjoyable.');


-- 7. Display reviews
SELECT *
FROM customer_review;


-- 8. Delete a film with a review
DELETE FROM new_film
WHERE id = 1;


-- 9. Check customer_review
SELECT *
FROM customer_review;