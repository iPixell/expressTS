import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [];

app.get('/books', (req: Request, res: Response) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req: Request, res: Response) => {
  const book = books.find(b=>b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Not Found"});
  
  res.status(200).json(books);
});

app.post('/books', (req: Request, res: Response) => {
  const newBook: Book = {
    id: books.length + 1,
    ...req.body
  };
  books.push(newBook);
  res.status(201).json(books);
});

app.put('/books/:id', (req: Request, res: Response) => {
  const index = books.findIndex(b=>b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not Found"});
  
  books[index] = {
    ...books[index],
    ...req.body
  };
  res.status(200).json(books[index]);
});

app.delete('/books/:id', (req: Request, res: Response) => {
  const index = books.findIndex(b=>b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not Found"});
  
  books.splice(index, 1);
  res.status(200).json({ message: 'Book Successfully Deleted'});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});