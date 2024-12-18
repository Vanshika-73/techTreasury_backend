import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import connectDB from "./config/connectDb.js";
import cors from "cors";
import users from "./routes/UserRoute.js";
import carts from './routes/CartRoute.js';
import orders from './routes/OrderRoute.js';
import projects from './routes/ProjectRoute.js'
import dotenv from "dotenv";
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

dotenv.config();

const app= express();

app.use(cors());
app.use(express.json());

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app.use('/uploads', express.static('uploads')); 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/user",users);
app.use('/api/projects',projects);
app.use("/api/cart",carts)
app.use("/api/order",orders)
app.use(notFound);
app.use(errorHandler);
const port =process.env.PORT || 3000;
app.listen(port,()=>console.log(`server is running on port ${port}`));