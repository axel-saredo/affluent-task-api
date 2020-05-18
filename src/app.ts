import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import userRoutes from './routes/users';

const PORT = 3000;
const app = express();
app.use(json());

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

app.listen(3000, () => console.log(`Server listening on ${PORT}...`));