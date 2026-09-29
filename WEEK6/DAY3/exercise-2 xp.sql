-- 1. Check languages
SELECT *
FROM language;


-- Update film languages
UPDATE film
SET language_id = 2
WHERE film_id IN (1, 2, 3);


-- Verify
SELECT 
    film.film_id,
    film.title,
    language.name AS language
FROM film
JOIN language
    ON film.language_id = language.language_id
WHERE film.film_id IN (1, 2, 3);


-- 2. Check customer foreign keys
SHOW CREATE TABLE customer;


-- 3. Drop customer_review
DROP TABLE customer_review;


-- 4. Count outstanding rentals
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;


-- 5. 30 most expensive outstanding movies
SELECT
    film.film_id,
    film.title,
    film.replacement_cost,
    rental.rental_date
FROM rental
JOIN inventory
    ON rental.inventory_id = inventory.inventory_id
JOIN film
    ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL
ORDER BY film.replacement_cost DESC
LIMIT 30;


-- 6.1 Sumo wrestler + Penelope Monroe
SELECT DISTINCT
    film.film_id,
    film.title,
    film.description
FROM film
JOIN film_actor
    ON film.film_id = film_actor.film_id
JOIN actor
    ON film_actor.actor_id = actor.actor_id
WHERE actor.first_name = 'PENELOPE'
  AND actor.last_name = 'MONROE'
  AND (
      film.description LIKE '%sumo%'
      OR film.description LIKE '%wrestler%'
  );


-- 6.2 Short R-rated documentary
SELECT
    film_id,
    title,
    description,
    length,
    rating
FROM film
WHERE length < 60
  AND rating = 'R'
  AND description LIKE '%documentary%';


-- 6.3 Matthew Mahan + returned July 28-August 1
SELECT
    film.film_id,
    film.title,
    payment.amount,
    rental.return_date
FROM customer
JOIN rental
    ON customer.customer_id = rental.customer_id
JOIN payment
    ON rental.rental_id = payment.rental_id
JOIN inventory
    ON rental.inventory_id = inventory.inventory_id
JOIN film
    ON inventory.film_id = film.film_id
WHERE customer.first_name = 'MATTHEW'
  AND customer.last_name = 'MAHAN'
  AND payment.amount > 4.00
  AND rental.return_date >= '2005-07-28'
  AND rental.return_date < '2005-08-02';


-- 6.4 Matthew Mahan + "boat" + expensive replacement
SELECT DISTINCT
    film.film_id,
    film.title,
    film.description,
    film.replacement_cost
FROM customer
JOIN rental
    ON customer.customer_id = rental.customer_id
JOIN inventory
    ON rental.inventory_id = inventory.inventory_id
JOIN film
    ON inventory.film_id = film.film_id
WHERE customer.first_name = 'MATTHEW'
  AND customer.last_name = 'MAHAN'
  AND (
      film.title LIKE '%boat%'
      OR film.description LIKE '%boat%'
  )
ORDER BY film.replacement_cost DESC;