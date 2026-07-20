import express, { Request, Response, NextFunction } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [];

const findBook = (id: number) => books.findIndex(b => b.id === id);

export const getAllBooks = (req: Request, res: Response) => {
  res.json({ success: true, message: "Books Retrieved", data: books});
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    const err: any = new Error("Book Not Found");
    err.status = 404;
    return next(err);
  }
  res.json({ success: true, message: "Books Details Retrieved", data: book});
};

export const createBook = (req: Request, res: Response) => {
  const newBook = {
    id: books.length + 1, ...req.body
  };
  books.push(newBook);
  res.status(201).json({ success: true, message: "Book Added", data: newBook});
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const idx = findBook(parseInt(req.params.id));
  
  if (idx === -1) {
    const err: any = new Error("Book Not Found");
    err.status = 404;
    return next(err);
  }
  
  books[idx] = {
    ...books[idx], ...req.body
  };
  res.json({ success: true, message: "Books Retrieved", data: books});
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const idx = findBook(parseInt(req.params.id));
  
  if (idx === -1) {
    const err: any = new Error("Book Not Found");
    err.status = 404;
    return next(err);
  }
  
  books.splice(idx, 1);
  res.json({ success: true, message: "Books Deleted"});
};


