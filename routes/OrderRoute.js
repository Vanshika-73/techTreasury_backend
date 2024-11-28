import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/OrderCotroller.js";

const routes = Router();

routes.get("/", getOrders);
routes.get("/:_id", getOrder);
routes.post("/", createOrder);
routes.put("/:_id", updateOrder);
routes.delete("/:_id", deleteOrder);

export default routes;