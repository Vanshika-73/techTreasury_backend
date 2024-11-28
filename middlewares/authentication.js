// middleware/auth.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// const isAdmin = async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   if (user && user.isAdmin === true) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied. Admin only.' });
//   }
// };
const isSeller = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new Error("no token found");
  let { id } = jwt.verify(token.split(" ")[1], process.env.SECRET_PRIVATE_KEY);
  if (!id) throw new Error("invlid token");
  const user  = await User.findOne({ _id: id });
  if (user && user.role === 'Seller') {
        next();
      } else {
        res.status(403).json({ message: 'This project does not belong to you' });
      }
});
const isBuyer = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new Error("no token found");
  let { id } = jwt.verify(token.split(" ")[1], process.env.SECRET_PRIVATE_KEY);
  if (!id) throw new Error("invlid token");
  const  user  = await User.findOne({ _id: id });
  if (user && user.role === 'Buyer') {
        next();
      } else {
        res.status(403).json({ message: 'This project does not belong to you' });
      }
});
export { isSeller, isBuyer };
