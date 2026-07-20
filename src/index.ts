import express from 'express';
import cors from 'cors';
import { errorHandler  } from './middlewares/error.middleware';
import bookRoute from './routes/book.route';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api/books', bookRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});