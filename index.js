import express from "express";
import connectDB from "./config/connectDb.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import users from "./routes/UserRoute.js";
import carts from './routes/CartRoute.js';
import orders from './routes/OrderRoute.js';
import projects from './routes/ProjectRoute.js'
import dotenv from "dotenv";


dotenv.config();

const app= express();

app.use(cors());
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
app.use('/uploads', express.static('uploads')); 
app.use("/api/user",users);
app.use('/api/projects',projects);
app.use("/api/cart",carts)
app.use("/api/order",orders)
app.use(errorHandler);
app.use(notFound);
const port =process.env.PORT || 3000;
app.listen(port,()=>console.log(`server is running on port ${port}`));