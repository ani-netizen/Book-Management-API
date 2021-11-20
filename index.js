const BookModel = require("./database/books")
const AuthorModel = require("./database/authors")
const PublicationModel = require("./database/publications")
require('dotenv').config()

const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const mongoDB = process.env.MongoDB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));

// GET Requests

/*
Route		|	/
Description	|	
Access		|	Public
Parameter	|	--
Methods		|	GET
Sample Link	|	http://localhost:3000/
*/
app.get("/", async (req, res) => {
	return res.json("Welcome");
});

// BOOK GETS

/*
Route		|	/books/get/all
Description	|	Get all the Books 
Access		|	Public
Parameter	|	--
Methods		|	GET
Sample Link	|	http://localhost:3000/books/get/all
*/
app.get("/books/get/all", async (req, res) => {
	const getAllBooks = await BookModel.find();
	return res.json(getAllBooks);
});

/*
Route		|	/books/get/isbn/:isbn
Description	|	Get a specific on basis of ISBN
Access		|	Public
Parameter	|	isbn
Methods		|	GET
Sample Link	|	http://localhost:3000/books/get/isbn/12345ONE
*/
app.get("/books/get/isbn/:isbn", async (req, res) => {
	const { isbn } = req.params;
	const getSpecificBook = await BookModel.findOne({ ISBN: isbn });
	if (getSpecificBook === null) {
		return res.json({ "error": `No Book Found for ISBN ${isbn}` });
	}
	else {
		return res.json(getSpecificBook);
	}
});

/*
Route		|	/books/get/category/:category
Description	|	Get specific books on the basis of category 
Access		|	Public
Parameter	|	category
Methods		|	GET
Sample Link	|	http://localhost:3000/books/get/category/programming
*/
app.get("/books/get/category/:category", async (req, res) => {
	const { category } = req.params;
	const getSpecificBooks = await BookModel.find({ categories: category });
	console.log(getSpecificBooks);
	if (getSpecificBooks.length === 0) {
		return res.json({ "error": `No Book Found of category ${category}` });
	}
	else {
		return res.json(getSpecificBooks);
	}
});

/*
Route		|	/books/get/author/:authorID
Description	|	Get specific books on the basis of author
Access		|	Public
Parameter	|	authorID
Methods		|	GET
Sample Link	|	http://localhost:3000/books/get/author/1
*/
app.get("/books/get/author/:authorID", async (req, res) => {
	let { authorID } = req.params;
	authorID = Number(authorID);
	const getSpecificBooks = await BookModel.find({ authors: authorID });
	if (getSpecificBooks.length === 0) {
		return res.json({ "error": `No Book Found of author with id ${authorID}` });
	}
	else {
		return res.json(getSpecificBooks);
	}
});

// AUTHOR GETS

/*
Route		|	/authors/get/all
Description	|	Get all the authors
Access		|	Public
Parameter	|	--
Methods		|	GET
Sample Link	|	http://localhost:3000/authors/get/all
*/
app.get("/authors/get/all", async (req, res) => {
	const getAllAuthors = await AuthorModel.find();
	return res.json(getAllAuthors);
});

/*
Route		|	/authors/get/id/:id
Description	|	Get a specific author on the basis of id
Access		|	Public
Parameter	|	id
Methods		|	GET
Sample Link	|	http://localhost:3000/authors/get/id/1
*/
app.get("/authors/get/id/:id", async (req, res) => {
	let { id } = req.params;
	id = Number(id);
	const getSpecificAuthor = await AuthorModel.findOne({ id: id });
	if (getSpecificAuthor === null) {
		return res.json({ "error": `No Author Found with id ${id}` });
	}
	else {
		return res.json(getSpecificAuthor[0]);
	}
});

/*
Route		|	/authors/get/book/:book
Description	|	Get specific authors on the basis of ISBN
Access		|	Public
Parameter	|	book
Methods		|	GET
Sample Link	|	http://localhost:3000/authors/get/book/12345ONE
*/
app.get("/authors/get/book/:book", async (req, res) => {
	const { book } = req.params;
	const getSpecificAuthor = await AuthorModel.find({ books: book });
	if (getSpecificAuthor.length === 0) {
		return res.json({ "error": `No Author Found for book ${category}` });
	}
	else {
		return res.json(getSpecificAuthor);
	}
});

// PUBLICATION GETS 

/*
Route		|	/publications/get/all
Description	|	Get all the Publications
Access		|	Public
Parameter	|	--
Methods		|	GET
Sample Link	|	http://localhost:3000/publications/get/all
*/
app.get("/publications/get/all", async (req, res) => {
	const getAllPublications = await PublicationModel.find();
	return res.json(getAllPublications);
});

/*
Route		|	/publications/get/id/:id
Description	|	Get a specific publication on the basis of id 
Access		|	Public
Parameter	|	id
Methods		|	GET
Sample Link	|	http://localhost:3000/publications/get/id/1
*/
app.get("/publications/get/id/:id", async (req, res) => {
	let { id } = req.params;
	id = Number(id);
	const getSpecificPublications = await PublicationModel.findOne({ id: id });
	if (getSpecificPublications === null) {
		return res.json({ "error": `No Publisher Found with id ${id}` });
	}
	else {
		return res.json(getSpecificPublications[0]);
	}
});

/*
Route		|	/publications/get/book/:book
Description	|	Get specific publication on the basis of book
Access		|	Public
Parameter	|	book
Methods		|	GET
Sample Link	|	http://localhost:3000/publications/get/book/12345ONE
*/
app.get("/publications/get/book/:book", async (req, res) => {
	const { book } = req.params;
	const getSpecificPublications = await PublicationModel.find({ books: book });
	if (getSpecificPublications.length === 0) {
		return res.json({ "error": `No Publisher Found for book ${category}` });
	}
	else {
		return res.json(getSpecificPublications);
	}
});

// POST Requests

// BOOK POSTS

/*
Route		|	/books/post
Description	|	POst a new book
Access		|	Public
Parameter	|	--
Methods		|	POST
Sample Link	|	http://localhost:3000/books/post
*/
app.post("/books/post", async (req, res) => {
	const newBook = await BookModel.create(req.body);
	return res.json({
		book: newBook,
		message: "Book Added Successfully"
	});
});

// AUTHOR POSTS

/*
Route		|	/authors/post
Description	|	Post a new author
Access		|	Public
Parameter	|	--
Methods		|	POST
Sample Link	|	http://localhost:3000/authors/post
*/
app.post("/authors/post", async (req, res) => {
	const newAuthor = await AuthorModel.create(req.body);
	return res.json({
		author: newAuthor,
		message: "Author Added Successfully"
	});
});

// PUBLICATION POSTS

/*
Route		|	/publications/post
Description	|	Post a new Publication
Access		|	Public
Parameter	|	--
Methods		|	POST
Sample Link	|	http://localhost:3000/publications/post
*/
app.post("/publications/post", async (req, res) => {
	const newPublication = await PublicationModel.create(req.body);
	return res.json({
		publication: newPublication,
		message: "Author Added Successfully"
	});
});

// PUT Requests

// BOOK PUTS

/*
Route		|	/books/update/:isbn
Description	|	Update a book
Access		|	Public
Parameter	|	isbn
Methods		|	PUT
Sample Link	|	http://localhost:3000/books/update/12345Two
*/
app.put("/books/update/:isbn", async (req, res) => {
	const { isbn } = req.params;
	const updatedBook = await BookModel.findOneAndUpdate({ ISBN: isbn }, req.body);
	return res.json({
		book: updatedBook,
		message: "Book Updated Successfully"
	});
});

// AUTHOR PUTS

/*
Route		|	/authors/update/:id
Description	|	Update an author
Access		|	Public
Parameter	|	id
Methods		|	PUT
Sample Link	|	http://localhost:3000/authors/update/1
*/
app.put("/authors/update/:id", async (req, res) => {
	const { id } = req.params;
	const updatedAuthor = await AuthorModel.findOneAndUpdate({ id: id }, req.body);
	return res.json({
		book: updatedAuthor,
		message: "Author Updated Successfully"
	});
});

// PUBLICATION PUTS

/*
Route		|	/publications/update/:id
Description	|	Update a publication
Access		|	Public
Parameter	|	id
Methods		|	PUT
Sample Link	|	http://localhost:3000/publications/update/1
*/
app.put("/publications/update/:id", async (req, res) => {
	const { id } = req.params;
	const updatedPublication = await PublicationModel.findOneAndUpdate({ id: id }, req.body);
	return res.json({
		book: updatedPublication,
		message: "Publication Updated Successfully"
	});
});

// DELETE Requests

// BOOK DELETES

/*
Route		|	/books/delete/:isbn
Description	|	Delete a book
Access		|	Public
Parameter	|	isbn
Methods		|	DELETE
Sample Link	|	http://localhost:3000/books/delete/12345Two
*/
app.delete("/books/delete/:isbn", async (req, res) => {
	const { isbn } = req.params;
	await BookModel.remove({ ISBN: isbn })
	return res.json("Book Deleted");
});

/*
Route		|	/books/delete-author/:isbn/:id
Description	|	Delete an authon from a book
Access		|	Public
Parameter	|	isbn, id
Methods		|	DELETE
Sample Link	|	http://localhost:3000/books/delete-author/12345Two/2
*/
app.delete("/books/delete-author/:isbn/:id", async (req, res) => {
	const { isbn, id } = req.params;
	let getSpecificBook = await BookModel.findOne({ ISBN: isbn })
	if (getSpecificBook === null) {
		return res.json({ "error": `No Book Found for id ${isbn}` });
	}
	else {
		getSpecificBook.authors.remove(id)
		await BookModel.findOneAndUpdate({ ISBN: isbn }, getSpecificBook);
		return res.json("Author Deleted");
	}
});

// AUTHOR DELETES

/*
Route		|	/authors/delete/:id
Description	|	Delete an author
Access		|	Public
Parameter	|	id
Methods		|	DELETE
Sample Link	|	http://localhost:3000/authors/delete/2
*/
app.delete("/authors/delete/:id", async (req, res) => {
	const { id } = req.params;
	await AuthorModel.remove({ id: id })
	return res.json("Author Deleted");
});

/*
Route		|	/authors/delete-book/:id/:isbn
Description	|	Delete a book for an author
Access		|	Public
Parameter	|	id, isbn
Methods		|	DELETE
Sample Link	|	http://localhost:3000/authors/delete-book/2/12345Two
*/
app.delete("/authors/delete-book/:id/:isbn", async (req, res) => {
	const { id, isbn } = req.params;
	let getSpecificAuthor = await AuthorModel.findOne({ id: id })
	if (getSpecificAuthor === null) {
		return res.json({ "error": `No Author Found for id ${id}` });
	}
	else {
		getSpecificAuthor.books.remove(isbn)
		await AuthorModel.findOneAndUpdate({ id: id }, getSpecificAuthor);
		return res.json("Book Deleted");
	}
});

// PUBLICATION DELETES

/*
Route		|	/publications/delete/:id
Description	|	Delete a publication
Access		|	Public
Parameter	|	id
Methods		|	DELETE
Sample Link	|	http://localhost:3000/publications/delete/1
*/
app.delete("/publications/delete/:id", async (req, res) => {
	const { id } = req.params;
	await PublicationModel.remove({ id: id });
	return res.json("Publication Deleted");
});

app.listen(3000, () => {
	console.log("MY EXPRESS APP IS RUNNING.....");
});