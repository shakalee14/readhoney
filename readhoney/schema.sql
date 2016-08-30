DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  encrypted_password VARCHAR(255)
);
CREATE UNIQUE INDEX email ON users (email);

DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  image_url VARCHAR(255),
  created_at DATE
);

DROP TABLE IF EXISTS wanted_books;
CREATE TABLE wanted_books (
  id SERIAL PRIMARY KEY,
  user_id SERIAL,
  book_id SERIAL,
  created_at DATE
);

DROP TABLE IF EXISTS owned_books;
CREATE TABLE owned_books (
  id SERIAL PRIMARY KEY,
  user_id SERIAL,
  book_id SERIAL,
  created_at DATE
);

DROP TABLE IF EXISTS book_authors;
CREATE TABLE book_authors (
  author_id SERIAL,
  book_id SERIAL
);

DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

INSERT INTO authors (name)
VALUES('Chinwe Achibe'),
('Paolo Freire'),
('Chimamanda Ngozi Adichie'),
('Barbara Ransby'),
('Gloria Anzaldua'),
('Cherrie Moraga'),
('Octavia Butler'),
('Toni Morrison'),
('James Baldwin'),
('Ralph Ellison'),
('Ta-nehisi Coates'),
('Leslie Feinberg'),
('Angela Davis');


INSERT INTO books (title)
VALUES('Things Fall Apart'),
('Pedagogy of the Oppressed'),
('Americanah'), 
('Ella Baker Biography'), 
('This Bridge called my back'), 
('Parable of the Sower'), 
('Sula'), 
('The Fire Nextime'), 
('Invisible Man'),
('Between the World and Me'),
('Stone Butch Blues'),
('Women, Race and Class');

--- join tables start here
INSERT INTO wanted_books(book_id, user_id)
  SELECT books.id, users.id FROM books
  CROSS JOIN users
  WHERE books.title = 'Between the World and Me'
  AND authors.name = 'Ta-nehisi Coates';

INSERT INTO wanted_books(book_id, user_id)
  SELECT books.id, users.id FROM books
  CROSS JOIN users
  WHERE books.title = 'Stone Butch Blues'
  AND authors.name = 'Leslie Feinberg';

INSERT INTO wanted_books(book_id, user_id)
  SELECT books.id, users.id FROM books
  CROSS JOIN users
  WHERE books.title = 'Women, Race and Class'
  AND authors.name = 'Angela Davis';


INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Things Fall Apart'
  AND authors.name = 'Chinwe Achibe';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Pedagogy of the Oppressed'
  AND authors.name = 'Paolo Freire';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Chimamanda Ngozi Adichie'
  AND authors.name = 'Americanah';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'This Bridge called my back'
  AND authors.name = 'Gloria Anzaldua';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'This Bridge called my back'
  AND authors.name = 'Cherrie Moraga';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Parable of the Sower'
  AND authors.name = 'Octavia Butler';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Sula'
  AND authors.name = 'Toni Morrison';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'The Fire Nextime'
  AND authors.name = 'James Baldwin';

INSERT INTO book_authors(book_id, author_id)
  SELECT books.id, authors.id FROM books
  CROSS JOIN authors
  WHERE books.title = 'Invisible Man'
  AND authors.name = 'Ralph Ellison';



-- SELECT
--   *
-- FROM
--   todo_list_items
-- WHERE
--     user_id=$1
-- ORDER BY
--   rank ASC
-- ;
--
-- SELECT
--   id
-- FROM
--   users
-- WHERE
--   users.id = todo_list_items.user_id
-- ;

-- INSERT INTO todo_list_items VALUES (
--   id PRIMARY KEY NOT NULL
--   user_id INTEGER NOT NULL
--   description VARCHAR(255) NOT NULL
--   note TEXT
--   rank INTEGER
--   due_date DATE
-- );
