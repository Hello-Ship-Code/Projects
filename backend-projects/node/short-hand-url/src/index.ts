import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import { env } from './env.config';

import { useRouter } from './routes/router';

const app = express();

app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, '..', 'src', 'views'); // ✅ Correct path

app.set('views', viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use('/url', useRouter);

// Database Connection
mongoose
  .connect(env.DATABASE_URL)
  .then(() => console.log('Connected to Database...'))
  .catch((err) => console.error('Database connection error:', err));

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`));
