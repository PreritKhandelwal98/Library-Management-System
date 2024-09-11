import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const addBook = async (req: Request, res: Response) => {
  const { title, author, description, publishedYear } = req.body;
  const newBook = new Book({ title, author, description, publishedYear });

  await newBook.save();
  res.status(201).json(newBook);
};

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
};

export const searchBooks = async (req: Request, res: Response) => {
  const { title, author } = req.query;
  const query: any = {};

  if (title) query.title = { $regex: title, $options: "i" };
  if (author) query.author = { $regex: author, $options: "i" };

  const books = await Book.find(query);
  res.json(books);
};
