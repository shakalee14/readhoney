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
  wanted BOOLEAN,
  image_url VARCHAR(255),
  created_at DATE
);

DROP TABLE IF EXISTS wanted_books;
CREATE TABLE wanted_books (
  user_id SERIAL,
  book_id SERIAL,
  created_at DATE
);

DROP TABLE IF EXISTS owned_books;
CREATE TABLE owned_books (
  user_id SERIAL,
  book_id SERIAL,
  created_at DATE
);

INSERT INTO books (title, author, image_url)
VALUES('Things Fall Apart', 'Chinwe Achibe', 'http://placehold.it/150x275'),
('Pedagogy of the Oppressed', 'Paolo Freire', 'http://placehold.it/150x275'),
('Americanah', 'Chimamanda Ngozi Adichie', 'http://placehold.it/150x275'), 
('Ella Baker Biography', 'Barbara Ransby', 'http://placehold.it/150x275'), 
('This Bridge called my back', 'Gloria Anzaldua', 'http://placehold.it/150x275'), 
('Parable of the Sower', 'Octavia Butler', 'http://placehold.it/150x275'), 
('Sula', 'Toni Morrison', 'http://placehold.it/150x275'), 
('The Fire Nextime', 'James Baldwin', 'http://placehold.it/150x275'), 
('Invisible Man', 'Ralph Ellison', 'http://placehold.it/150x275'),
('Between the World and Me', 'Ta-nehisi Coates', 'http://placehold.it/150x275'),
('Stone Butch Blues', 'Leslie Feinberg', 'http://placehold.it/150x275'),
('Women, Race and Class', 'Angela Davis', 'http://placehold.it/150x275');

INSERT INTO users(email, encrypted_password)
VALUES('jrob',''),('slee',''),('monica','');

INSERT INTO owned_books(user_id, book_id, created_at)
VALUES(1,1,now()),(1,6,now()),(3,9,now()),(3,12,now()),(2,9,now()),(2,12,now());

INSERT INTO wanted_books(user_id, book_id, created_at)
VALUES(1,9,now());
