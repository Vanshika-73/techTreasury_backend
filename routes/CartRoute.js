import { Router } from "express";
import { addCartItem, clearCart, createUserCart, deleteCartItem, getUserCart } from "../controllers/CartController.js";
import { isBuyer } from "../middlewares/authentication.js";
const routes= Router();

routes.get("/:user",isBuyer,getUserCart);
routes.post("/:user",createUserCart);
routes.put("/:user",isBuyer,addCartItem);
routes.delete("/:user/:_id",isBuyer,deleteCartItem);
routes.put("/clear/:user",clearCart);
export default routes;