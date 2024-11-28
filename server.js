import express from "express";
import connectDB from "./config/connectDb.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import users from "./routes/UserRoute.js";
import carts from './routes/CartRoute.js';
import orders from './routes/OrderRoute.js';
import projects from './routes/ProjectRoute.js'
import { isBuyer } from "./middlewares/authentication.js";
const app= express();

app.use(cors());
app.use(express.json());

connectDB();
app.use('/uploads', express.static('uploads')); 
app.use("/api/user",users);
app.use('/api/projects',projects);
app.use("/api/cart",carts)
app.use("/api/order",orders)
app.use(errorHandler);
app.use(notFound);
const port =5555;
app.listen(port,()=>console.log(`server is running on port ${port}`));