import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/connectDb.js';
import users from '../routes/UserRoute.js';
import carts from '../routes/CartRoute.js';
import orders from '../routes/OrderRoute.js';
import projects from '../routes/ProjectRoute.js';
import errorHandler from '../middlewares/errorHandler.js';
import notFound from '../middlewares/notFound.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use('/api/user', users);
app.use('/api/projects', projects);
app.use('/api/cart', carts);
app.use('/api/order', orders);

app.use(notFound);
app.use(errorHandler);

export default app;
