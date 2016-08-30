'use strict'

const getBookAuthors = id => {
	const sql = `
		SELECT
		 *
		FROM 
		 book_authors
		JOIN
		 authors 
		ON 
		 book_authors.author_id=authors.id	
	`
	return db.any(sql, [id])
}

const getAllBooksbyId = id => {
	const sql = `
		SELECT
		 *
		FROM 
		 book_authors
		JOIN
		 books
		ON 
		 book_authors.book_id=books.id	
	`
	return db.any(sql, [id])
}